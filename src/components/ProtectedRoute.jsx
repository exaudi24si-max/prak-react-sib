import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Loading from './Loading'

// Melindungi route dari akses tanpa login.
// Jika belum login → redirect ke /login
// Jika sudah login → render halaman (Outlet)
export default function ProtectedRoute() {
  const [session, setSession] = useState(undefined) // undefined = masih loading

  useEffect(() => {
    // Cek sesi saat pertama kali render
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Dengerin perubahan sesi (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Masih ngecek sesi → tampilkan loading
  if (session === undefined) return <Loading />

  // Tidak ada sesi → redirect ke halaman login
  if (!session) return <Navigate to="/login" replace />

  // Ada sesi → lanjutkan render halaman
  return <Outlet />
}
