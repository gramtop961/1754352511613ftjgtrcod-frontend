import { useEffect, useState } from 'react'

export interface RuntimeConfig {
  backendUrl: string
}

export function useRuntimeConfig() {
  const [config, setConfig] = useState<RuntimeConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/config.json', { 
      cache: 'no-store',
      // Add cache-busting query param to ensure fresh data
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.status}`)
        }
        return response.json()
      })
      .then((cfg: RuntimeConfig) => {
        console.log('Runtime config loaded:', cfg)
        setConfig(cfg)
        setError(null)
      })
      .catch(err => {
        console.error('Failed to load runtime config:', err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { config, error, loading }
} 