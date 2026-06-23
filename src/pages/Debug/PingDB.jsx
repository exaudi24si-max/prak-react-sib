import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { pingDatabase } from "../../services/supabaseService"

export default function PingDB() {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const res = await pingDatabase()
      if (!mounted) return
      setResult(res)
      setLoading(false)
    })()
    return () => (mounted = false)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Database Ping Result</h2>
      <div className="bg-gray-50 border rounded p-4">
        <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  )
}
