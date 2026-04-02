'use client'

import React, { useState, useEffect } from 'react'
import { useExplorerStore } from '@/store/useExplorerStore'
import { useDebounce } from '@/hooks/useDebounce'
import { Search, Loader2, X } from 'lucide-react'

export const SearchInterface = () => {
  const { searchQuery, setSearchQuery, currentResource } = useExplorerStore()
  const [inputValue, setInputValue] = useState(searchQuery)
  const debouncedSearch = useDebounce(inputValue, 500)

  // Sync internal input with global store (debounced)
  useEffect(() => {
    setSearchQuery(debouncedSearch)
  }, [debouncedSearch, setSearchQuery])

  // Sync internal input with store changes (e.g. from URL sync)
  useEffect(() => {
    if (searchQuery !== inputValue && !debouncedSearch) {
      setInputValue(searchQuery)
    }
  }, [searchQuery])

  // Reset local input only when resource truly switches
  useEffect(() => {
    setInputValue('')
  }, [currentResource])

  return (
    <div className="relative w-full">
      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-bold">
          <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Search...`}
          className="block w-full rounded-lg border-2 border-slate-100 bg-slate-50/50 py-1.5 pl-10 pr-10 text-slate-900 placeholder:text-slate-500 font-bold outline-none focus:ring-0 focus:border-primary-600 focus:bg-white transition-all text-[10px] uppercase tracking-wider"
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {inputValue && (
             <button 
               onClick={() => setInputValue('')}
               className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
             >
               <X className="h-3 w-3" />
             </button>
          )}
          {searchQuery !== inputValue && (
             <Loader2 className="h-4 w-4 text-primary-600 animate-spin" />
          )}
        </div>
      </div>
    </div>
  )
}
