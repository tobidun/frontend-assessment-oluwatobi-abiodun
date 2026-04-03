'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DummyProduct } from '@/types'
import { useExplorerStore } from '@/store/useExplorerStore'
import { ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  item: DummyProduct
  priority?: boolean
}

export const ProductCard = ({ item, priority = false }: ProductCardProps) => {
  const { viewMode } = useExplorerStore()

  if (viewMode === 'list') {
    return (
      <Link
        href={`/products/${item.id}`}
        className="group relative flex items-center gap-6 p-4 rounded-lg backdrop-blur-md bg-white/70 border border-white/20 transition-all duration-300 hover:border-primary-600 hover:shadow-xl hover:shadow-primary-600/5 shadow-sm"
        aria-label={`View details for ${item.title}`}
      >
        <div className="relative h-16 w-16 flex-shrink-0 rounded bg-slate-50 border border-slate-100 overflow-hidden">
            <Image
              src={item.thumbnail || '/placeholder.png'}
              alt={item.title || 'Product'}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>

        <div className="flex-1 min-w-0 pr-10">
          <div className="flex flex-col gap-0.5 mb-1">
            <span className="text-[11px] font-semibold text-primary-600">
              {item.brand || 'Generic'} • Product
            </span>
            <h3 className="text-base font-bold text-slate-900 truncate tracking-tight">
              {item.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl font-medium">
            {item.description}
          </p>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary-600 transition-colors">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/products/${item.id}`}
      className="group flex flex-col backdrop-blur-md bg-white/70 rounded-lg border border-white/20 transition-all duration-400 hover:border-primary-600 hover:shadow-xl hover:shadow-primary-600/5 overflow-hidden h-full shadow-sm"
      aria-label={`View details for ${item.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
        <Image
          src={item.thumbnail || '/placeholder.png'}
          alt={item.title || 'Product'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col p-5 flex-grow space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary-600">
            {item.brand || 'Generic'}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900 leading-tight tracking-tight group-hover:text-primary-600 transition-colors">
            {item.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-primary-600 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </div>

        <p className="text-slate-500 font-medium leading-relaxed line-clamp-2 text-xs">
          {item.description}
        </p>

        <div className="pt-4 mt-auto flex flex-wrap gap-2">
          {item.tags?.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx}
              className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600 transition-all hover:bg-blue-50 hover:border-blue-200 hover:text-primary-600"
            >
              {tag}
            </span>
          )) || (
             <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600">
               Product
             </span>
          )}
        </div>
      </div>
    </Link>
  )
}
