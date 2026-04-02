'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProductCategories } from '@/lib/api'
import { useExplorerStore } from '@/store/useExplorerStore'
import { Filter, X, Check, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/**
 * Hybrid Category Filter
 * Shows top 4 categories inline + a high-fidelity modal for the full registry.
 */
export const ResourceFilters = () => {
  const { currentResource, activeFilter, setActiveFilter } = useExplorerStore()
  const [isOpen, setIsOpen] = useState(false)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchProductCategories,
    enabled: currentResource === 'products'
  })

  if (currentResource !== 'products') {
    return null
  }

  const handleSelect = (val: string) => {
    setActiveFilter(val)
    setIsOpen(false)
  }

  const topCategories = categories?.slice(0, 4) || []

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Inline Quick Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`h-11 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
            activeFilter === 'all'
            ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20'
            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-900'
          }`}
        >
          All
        </button>

        {topCategories.map((category: string) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`h-11 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
              activeFilter === category
              ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20'
              : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {category.replace('-', ' ')}
          </button>
        ))}

        <Button 
          variant={categories?.slice(4).includes(activeFilter) ? 'secondary' : 'outline'}
          icon={MoreHorizontal}
          onClick={() => setIsOpen(true)}
          className="h-11 px-6 !rounded-xl"
        >
          More Filters
        </Button>
      </div>

      {/* Filter Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Expand Search</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">Full Category Registry</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                icon={X}
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50/30">
              <div className="grid grid-cols-2 gap-3 pb-8">
                <button
                  onClick={() => handleSelect('all')}
                  className={`flex items-center justify-between px-6 py-5 rounded-2xl border-2 transition-all ${
                    activeFilter === 'all' 
                    ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-sm' 
                    : 'bg-white border-slate-100 hover:border-slate-300 text-slate-500'
                  }`}
                >
                  <span className="font-bold text-sm tracking-tight">All Inventory</span>
                  {activeFilter === 'all' && <Check className="h-4 w-4" />}
                </button>
                
                {categories?.map((category: string) => {
                  const isActive = activeFilter === category

                  return (
                    <button
                      key={category}
                      onClick={() => handleSelect(category)}
                      className={`flex items-center justify-between px-6 py-5 rounded-2xl border-2 transition-all capitalize ${
                        isActive 
                        ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-sm' 
                        : 'bg-white border-slate-100 hover:border-slate-300 text-slate-500'
                      }`}
                    >
                      <span className="font-bold text-sm tracking-tight">{category.replace('-', ' ')}</span>
                      {isActive && <Check className="h-4 w-4" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="p-8 bg-white flex items-center justify-between border-t border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active State: {activeFilter}</span>
               <Button size="lg" onClick={() => setIsOpen(false)}>Refine Search</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
