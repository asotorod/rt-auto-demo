import { useState, useEffect } from 'react'
import { fetchVehicles, fetchFeaturedVehicles, fetchVehicleBySlug, fetchInventoryStats } from './api'

/**
 * Hook to fetch all active vehicles
 */
export function useVehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(null)

  useEffect(() => {
    let cancelled = false
    
    async function load() {
      try {
        setLoading(true)
        const data = await fetchVehicles()
        if (!cancelled) {
          setVehicles(data)
          setSource(data[0]?._source || 'unknown')
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { vehicles, loading, error, source }
}

/**
 * Hook to fetch featured vehicles
 */
export function useFeaturedVehicles(limit = 6) {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchFeaturedVehicles(limit)
        if (!cancelled) setVehicles(data)
      } catch (err) {
        console.warn('Featured vehicles error:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [limit])

  return { vehicles, loading }
}

/**
 * Hook to fetch a single vehicle by slug
 */
export function useVehicle(slug) {
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const data = await fetchVehicleBySlug(slug)
        if (!cancelled) {
          setVehicle(data)
          setError(data ? null : 'Vehicle not found')
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [slug])

  return { vehicle, loading, error }
}

/**
 * Hook to fetch inventory stats
 */
export function useInventoryStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchInventoryStats()
        if (!cancelled) setStats(data)
      } catch (err) {
        console.warn('Stats error:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { stats, loading }
}
