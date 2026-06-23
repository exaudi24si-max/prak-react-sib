import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Loading from './Loading'

// Route khusus untuk halaman guest (Login & Register).
// Jika user sudah login → redirect ke / (dashboard)
// Jika belum login → render halaman login/register (Outlet)
export default function GuestRoute() {
  const [session, setSession] = useState(undefined) // undefined = masih loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Masih ngecek sesi → tampilkan loading
  if (session === undefined) return <Loading />

  // Sudah login → redirect ke dashboard
  if (session) return <Navigate to="/" replace />

  // Belum login → tampilkan halaman login/register
  return <Outlet />
}
