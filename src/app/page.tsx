'use client'

import { useEffect, useState } from 'react'
import { useRuntimeConfig } from '../lib/useRuntimeConfig'

export default function Home() {
  const [data, setData] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const { config, error: configError, loading } = useRuntimeConfig()

  useEffect(() => {
    // Wait for config to load
    if (loading || !config) return

    console.log('Using backend URL from runtime config:', config.backendUrl)
    
    fetch(`${config.backendUrl}/api/hello`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setData(data.message)
        setFetchError(null)
      })
      .catch((err) => {
        setFetchError(`Failed to fetch: ${err.message}`)
      })
  }, [config, loading])

  // Show loading state
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Frontend-Backend Connection Test</h1>
          <p>Loading configuration...</p>
        </div>
      </main>
    )
  }

  // Show config error
  if (configError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Frontend-Backend Connection Test</h1>
          <p className="text-red-500">Configuration Error: {configError}</p>
          <p className="mt-2 text-sm text-gray-500">
            Make sure config.json is available in the public directory
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Frontend-Backend Connection Test</h1>
        {fetchError ? (
          <p className="text-red-500">{fetchError}</p>
        ) : (
          <p>{data ? data : 'Loading...'}</p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          <p>Backend URL: {config?.backendUrl || 'Not loaded'}</p>
          <p>Source: Runtime config (config.json)</p>
        </div>
      </div>
    </main>
  )
}
