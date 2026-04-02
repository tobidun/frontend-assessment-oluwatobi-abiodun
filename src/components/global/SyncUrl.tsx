'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useExplorerStore } from '@/store/useExplorerStore'

/**
 * High-Fidelity URL Sync Engine
 * Reconciles Zustand store with SearchParams bi-directionally.
 */
export const SyncUrl = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const { 
    searchQuery, setSearchQuery, 
    activeFilter, setActiveFilter,
  } = useExplorerStore()

  // 1. URL -> Store Sync (Handles Back/Forward buttons and initialization)
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const filter = searchParams.get('filter') || 'all'
    
    // Only update store if it actually differs from URL to avoid redundant state updates
    if (q !== searchQuery) setSearchQuery(q)
    if (filter !== activeFilter) setActiveFilter(filter)
  }, [searchParams]) // Only depends on searchParams changes

  // 2. Store -> URL Sync (Handles User Interactions)
  useEffect(() => {
    const currentParams = searchParams.toString()
    const params = new URLSearchParams()
    
    if (searchQuery) params.set('q', searchQuery)
    if (activeFilter !== 'all') params.set('filter', activeFilter)

    const newQuery = params.toString()
    
    // Only update URL if the store-based query differs from current URL
    if (newQuery !== currentParams) {
      const url = newQuery ? `${pathname}?${newQuery}` : pathname
      router.replace(url, { scroll: false })
    }
  }, [searchQuery, activeFilter, pathname, router]) // Removed searchParams to prevent logic loops

  return null
}
