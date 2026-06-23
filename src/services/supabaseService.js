import { supabase } from '../lib/supabaseClient'

const tierDiscount = {
  Bronze: 0.05,
  Silver: 0.1,
  Gold: 0.15,
  Platinum: 0.2,
}

function supabaseNotConfiguredError() {
  return new Error('Supabase belum dikonfigurasi. Silakan tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY ke file .env.')
}

function ensureSupabase() {
  if (!supabase) {
    return { error: supabaseNotConfiguredError() }
  }
  return { data: supabase, error: null }
}

function getTierFromPoints(points) {
  if (points >= 10000) return 'Platinum'
  if (points >= 5000) return 'Gold'
  if (points >= 1000) return 'Silver'
  return 'Bronze'
}

export async function signInUser({ email, password }) {
  const { data: client, error } = ensureSupabase()
  if (error) return { data: null, error }
  try {
    const res = await client.auth.signInWithPassword({ email, password })

    // Supabase may return an `error` field or throw — normalize to Error
    if (res?.error) {
      const e = res.error
      const message = e?.message || e?.error || e?.msg || JSON.stringify(e)
      return { data: res.data || null, error: new Error(message) }
    }

    return { data: res?.data ?? res, error: null }
  } catch (err) {
    const message = err?.message || JSON.stringify(err)
    return { data: null, error: new Error(message) }
  }
}

// Diagnostic helper to check whether DB can be queried (useful for "Database error querying schema")
export async function pingDatabase() {
  const { data: client, error } = ensureSupabase()
  if (error) return { ok: false, error }

  try {
    // try a minimal query to detect schema / permission issues
    const { data, error: qErr } = await client.from('profiles').select('id').limit(1)
    if (qErr) {
      const message = qErr?.message || qErr?.error || JSON.stringify(qErr)
      return { ok: false, error: new Error(message) }
    }

    return { ok: true, error: null, data }
  } catch (err) {
    return { ok: false, error: new Error(err?.message || JSON.stringify(err)) }
  }
}

export async function registerUser({ email, password, full_name }) {
  const { data: client, error } = ensureSupabase()
  if (error) return { data: null, error }

  return client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  })
}

export async function signOutUser() {
  const { data: client, error } = ensureSupabase()
  if (error) return { error }

  return client.auth.signOut()
}

export async function getCurrentUserProfile() {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  const { data: userData, error: userError } = await client.auth.getUser()
  if (userError || !userData?.user) {
    return { data: null, error: userError }
  }

  const { data, error } = await client
    .from('profiles')
    .select('id, full_name, role, tier, points, created_at')
    .eq('id', userData.user.id)
    .single()

  return { data, error }
}

export async function getDashboardSummary() {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  const { data: profileData, error: profileError } = await getCurrentUserProfile()
  const isAdmin = profileData?.role === 'Admin'
  const userId = profileData?.id

  if (profileError) {
    return { data: null, error: profileError }
  }

  let orderQuery = client.from('orders').select('id, total_final_price, status')
  if (!isAdmin && userId) {
    orderQuery = orderQuery.eq('member_id', userId)
  }

  const { data: orders, error: orderError } = await orderQuery
  if (orderError) return { data: null, error: orderError }

  const totalOrders = Array.isArray(orders) ? orders.length : 0
  const totalDelivered = orders.filter((item) => item.status === 'Completed').length
  const totalCanceled = orders.filter((item) => item.status === 'Cancelled').length
  const totalRevenue = orders.reduce(
    (sum, item) => sum + Number(item.total_final_price || 0),
    0,
  )

  return {
    data: {
      totalOrders,
      totalDelivered,
      totalCanceled,
      totalRevenue,
    },
    error: null,
  }
}

export async function getProducts() {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: [], error: configError }

  const { data, error } = await client
    .from('products')
    .select('id, name, description, price, stock, created_at')
    .order('created_at', { ascending: false })

  if (error) return { data: [], error }

  // BUG FIX #1: Rename 'tittle' → 'title' untuk konsistensi
  const products = data.map((item) => {
    const description = item.description || ''
    const codeMatch = description.match(/code:([^;]+)/)
    const categoryMatch = description.match(/category:([^;]+)/)
    const brandMatch = description.match(/brand:([^;]+)/)

    return {
      id: item.id,
      title: item.name,      // FIX: was 'tittle'
      code: codeMatch ? codeMatch[1] : '',
      category: categoryMatch ? categoryMatch[1] : '',
      brand: brandMatch ? brandMatch[1] : '',
      price: Number(item.price),
      stock: item.stock,
    }
  })

  return { data: products, error: null }
}

export async function createProduct(product) {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  const description = `code:${product.code};category:${product.category};brand:${product.brand}`
  const { data, error } = await client.from('products').insert([
    {
      name: product.title,   // FIX: was product.tittle
      description,
      price: product.price,
      stock: product.stock,
    },
  ])

  return { data, error }
}

export async function getOrders() {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: [], error: configError }

  const { data: profileData, error: profileError } = await getCurrentUserProfile()
  const isAdmin = profileData?.role === 'Admin'
  const userId = profileData?.id

  if (profileError) return { data: [], error: profileError }

  let orderQuery = client
    .from('orders')
    .select('id, total_final_price, status, created_at, member_id, profiles(full_name)')
    .order('created_at', { ascending: false })

  if (!isAdmin && userId) {
    orderQuery = orderQuery.eq('member_id', userId)
  }

  const { data, error } = await orderQuery
  if (error) return { data: [], error }

  const orders = data.map((item) => ({
    id: item.id,
    status: item.status,
    totalPrice: Number(item.total_final_price || 0),
    orderDate: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '-',
    // BUG FIX #4: profiles adalah object (bukan array), hapus [0]
    customerName: item.profiles?.full_name || 'Member',
  }))

  return { data: orders, error: null }
}

// BUG FIX #2: tambahkan ensureSupabase() agar tidak crash jika .env kosong
export async function getProductById(id) {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  const { data, error } = await client
    .from('products')
    .select('id, name, description, price, stock, created_at')
    .eq('id', id)
    .single()

  if (error) return { data: null, error }

  const description = data.description || ''
  const categoryMatch = description.match(/category:([^;]+)/)
  const brandMatch = description.match(/brand:([^;]+)/)

  return {
    data: {
      id: data.id,
      title: data.name,
      category: categoryMatch ? categoryMatch[1] : '',
      brand: brandMatch ? brandMatch[1] : '',
      price: Number(data.price),
      stock: data.stock,
    },
    error: null,
  }
}

// ─── CUSTOMER CRUD ──────────────────────────────────────────────

export async function getCustomers() {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: [], error: configError }

  const { data, error } = await client
    .from('customers')
    .select('id, name, email, phone, loyalty, address, joined, created_at')
    .order('created_at', { ascending: false })

  if (error) return { data: [], error }

  return {
    data: data.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone || '',
      loyalty: c.loyalty,
      address: c.address || '',
      joined: c.joined || '-',
    })),
    error: null,
  }
}

export async function getCustomerById(id) {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  const { data, error } = await client
    .from('customers')
    .select('id, name, email, phone, loyalty, address, joined, created_at')
    .eq('id', id)
    .single()

  if (error) return { data: null, error }

  return {
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      loyalty: data.loyalty,
      address: data.address || '',
      joined: data.joined || '-',
    },
    error: null,
  }
}

export async function createCustomer(customer) {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  const { data, error } = await client
    .from('customers')
    .insert([
      {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || null,
        loyalty: customer.loyalty || 'Bronze',
        address: customer.address || null,
      },
    ])
    .select()
    .single()

  return { data, error }
}

export async function forgotPassword({ email }) {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  try {
    const res = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    if (res?.error) {
      const e = res.error
      const message = e?.message || e?.error || JSON.stringify(e)
      return { data: null, error: new Error(message) }
    }

    return { data: true, error: null }
  } catch (err) {
    return { data: null, error: new Error(err?.message || JSON.stringify(err)) }
  }
}


export async function createOrder(order) {
  const { data: client, error: configError } = ensureSupabase()
  if (configError) return { data: null, error: configError }

  const { data: profileData, error: profileError } = await getCurrentUserProfile()
  if (profileError) return { data: null, error: profileError }
  if (!profileData) {
    return { data: null, error: new Error('User not authenticated') }
  }

  const totalOriginalPrice = Number(order.totalPrice)
  const discountRate = tierDiscount[profileData.tier] || 0
  const discountApplied = Math.round(totalOriginalPrice * discountRate)
  const totalFinalPrice = totalOriginalPrice - discountApplied
  const pointsEarned = Math.floor(totalFinalPrice * 0.1)
  const newPoints = (profileData.points || 0) + pointsEarned
  const newTier = getTierFromPoints(newPoints)

  const { data: createdOrder, error: orderError } = await client.from('orders').insert([
    {
      member_id: profileData.id,
      total_original_price: totalOriginalPrice,
      discount_applied: discountApplied,
      total_final_price: totalFinalPrice,
      points_earned: pointsEarned,
      status: order.status,
    },
  ]).select().single()

  if (orderError) return { data: null, error: orderError }

  const { error: updateError } = await client.from('profiles').update({
    points: newPoints,
    tier: newTier,
  }).eq('id', profileData.id)

  if (updateError) return { data: createdOrder, error: updateError }

  return { data: createdOrder, error: null }
}
