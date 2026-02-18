import { supabase, DEALERSHIP_ID } from './supabase'
import { vehicles as staticVehicles } from '../data/inventory'

/**
 * Transform Supabase vehicle row into the format the demo site expects
 */
function transformVehicle(row) {
  return {
    id: row.id,
    stock: row.stock_number,
    stockNumber: row.stock_number,
    vin: row.vin,
    year: row.year,
    make: row.make,
    model: row.model,
    trim: row.trim || '',
    price: Number(row.asking_price),
    mileage: row.mileage,
    exteriorColor: row.exterior_color || '',
    interiorColor: row.interior_color || '',
    engine: row.engine || '',
    transmission: row.transmission || '',
    drivetrain: row.drivetrain || '',
    fuelType: row.fuel_type || '',
    bodyType: row.body_type ? row.body_type.charAt(0).toUpperCase() + row.body_type.slice(1) : 'Other',
    description: row.description || '',
    features: row.features || [],
    status: row.status === 'active' ? 'Active' : row.status,
    featured: row.is_featured,
    isFeatured: row.is_featured,
    inDate: row.in_date,
    soldDate: row.sold_date,
    slug: row.slug,
    // Photo from joined vehicle_photos — match static data field names
    image: row.vehicle_photos?.[0]?.url || '/placeholder-car.jpg',
    images: (row.vehicle_photos || []).map(p => p.url),
    photos: (row.vehicle_photos || []).map(p => p.url),
    // Carfax badges
    carfaxOneOwner: row.carfax_one_owner,
    carfaxCleanTitle: row.carfax_clean_title,
    carfaxAccidentFree: row.carfax_accident_free,
    // Multilingual
    descriptionPt: row.description_pt,
    descriptionEs: row.description_es,
    // Source flag
    _source: 'supabase'
  }
}

/**
 * Fetch all active vehicles for the dealership
 * Falls back to static data on error
 */
export async function fetchVehicles() {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select(`
        *,
        vehicle_photos (
          id, url, thumbnail_url, sort_order, is_primary
        )
      `)
      .eq('dealership_id', DEALERSHIP_ID)
      .eq('status', 'active')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!data || data.length === 0) throw new Error('No vehicles found')

    // Sort photos by sort_order within each vehicle
    return data.map(v => {
      if (v.vehicle_photos) {
        v.vehicle_photos.sort((a, b) => a.sort_order - b.sort_order)
      }
      return transformVehicle(v)
    })
  } catch (err) {
    console.warn('Supabase fetch failed, using static data:', err.message)
    return staticVehicles.map(v => ({ ...v, _source: 'static' }))
  }
}

/**
 * Fetch a single vehicle by slug or ID
 * Falls back to static data on error
 */
export async function fetchVehicleBySlug(slug) {
  try {
    // Try slug first, then ID
    let query = supabase
      .from('vehicles')
      .select(`
        *,
        vehicle_photos (
          id, url, thumbnail_url, sort_order, is_primary
        )
      `)
      .eq('dealership_id', DEALERSHIP_ID)

    // Check if it looks like a UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)
    
    if (isUUID) {
      query = query.eq('id', slug)
    } else {
      query = query.eq('slug', slug)
    }

    const { data, error } = await query.single()

    if (error) throw error
    if (!data) throw new Error('Vehicle not found')

    if (data.vehicle_photos) {
      data.vehicle_photos.sort((a, b) => a.sort_order - b.sort_order)
    }
    return transformVehicle(data)
  } catch (err) {
    console.warn('Supabase vehicle fetch failed, using static data:', err.message)
    // Fallback: find in static data by ID
    const staticVehicle = staticVehicles.find(v => 
      v.id === slug || v.slug === slug || String(v.id) === slug
    )
    return staticVehicle ? { ...staticVehicle, _source: 'static' } : null
  }
}

/**
 * Fetch featured vehicles (for homepage)
 */
export async function fetchFeaturedVehicles(limit = 6) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select(`
        *,
        vehicle_photos (
          id, url, thumbnail_url, sort_order, is_primary
        )
      `)
      .eq('dealership_id', DEALERSHIP_ID)
      .eq('status', 'active')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    if (!data || data.length === 0) throw new Error('No featured vehicles')

    return data.map(v => {
      if (v.vehicle_photos) {
        v.vehicle_photos.sort((a, b) => a.sort_order - b.sort_order)
      }
      return transformVehicle(v)
    })
  } catch (err) {
    console.warn('Featured fetch failed, using static data:', err.message)
    return staticVehicles
      .filter(v => v.isFeatured)
      .slice(0, limit)
      .map(v => ({ ...v, _source: 'static' }))
  }
}

/**
 * Fetch inventory summary stats
 */
export async function fetchInventoryStats() {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('id, asking_price, status, is_featured, make')
      .eq('dealership_id', DEALERSHIP_ID)
      .eq('status', 'active')

    if (error) throw error

    const vehicles = data || []
    return {
      totalActive: vehicles.length,
      totalValue: vehicles.reduce((sum, v) => sum + Number(v.asking_price), 0),
      makes: [...new Set(vehicles.map(v => v.make))].sort(),
      priceRange: {
        min: Math.min(...vehicles.map(v => Number(v.asking_price))),
        max: Math.max(...vehicles.map(v => Number(v.asking_price)))
      },
      _source: 'supabase'
    }
  } catch (err) {
    console.warn('Stats fetch failed, using static data:', err.message)
    return {
      totalActive: staticVehicles.length,
      totalValue: staticVehicles.reduce((sum, v) => sum + v.price, 0),
      makes: [...new Set(staticVehicles.map(v => v.make))].sort(),
      priceRange: {
        min: Math.min(...staticVehicles.map(v => v.price)),
        max: Math.max(...staticVehicles.map(v => v.price))
      },
      _source: 'static'
    }
  }
}

/**
 * Fetch dealership info
 */
export async function fetchDealershipInfo() {
  try {
    const { data, error } = await supabase
      .from('dealerships')
      .select('*')
      .eq('id', DEALERSHIP_ID)
      .single()

    if (error) throw error
    return { ...data, _source: 'supabase' }
  } catch (err) {
    console.warn('Dealership fetch failed:', err.message)
    return null
  }
}
