'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DummyUser } from '@/types'
import { useExplorerStore } from '@/store/useExplorerStore'
import { ArrowUpRight } from 'lucide-react'

interface UserCardProps {
  item: DummyUser
  priority?: boolean
}

export const UserCard = ({ item, priority = false }: UserCardProps) => {
  const { viewMode } = useExplorerStore()

  if (viewMode === 'list') {
    return (
      <Link
        href={`/users/${item.id}`}
        className="group relative flex items-center gap-6 p-4 rounded-lg backdrop-blur-md bg-white/70 border border-white/20 transition-all duration-300 hover:border-primary-600 hover:shadow-xl hover:shadow-primary-600/5 shadow-sm"
      >
        <div className="relative h-16 w-16 flex-shrink-0 rounded-full bg-slate-50 border border-slate-100 overflow-hidden">
            <Image
              src={item.image || '/placeholder.png'}
              alt={`${item.firstName} ${item.lastName}`}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>

        <div className="flex-1 min-w-0 pr-10">
          <div className="flex flex-col gap-0.5 mb-1">
            <span className="text-[11px] font-semibold text-primary-600 uppercase tracking-widest">
              Agent • {item.company?.title || 'Operations'}
            </span>
            <h3 className="text-base font-bold text-slate-900 truncate tracking-tight">
              {item.firstName} {item.lastName}
            </h3>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl font-medium">
            {item.email} • {item.company?.name || 'Independent'}
          </p>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary-600 transition-colors">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/users/${item.id}`}
      className="group flex flex-col backdrop-blur-md bg-white/70 rounded-lg border border-white/20 transition-all duration-400 hover:border-primary-600 hover:shadow-xl hover:shadow-primary-600/5 overflow-hidden h-full shadow-sm"
    >
      <div className="p-6 flex flex-col items-center flex-grow bg-white border-b border-slate-100 relative">
         <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-slate-200 mb-4 bg-slate-100">
          <Image
            src={item.image || '/placeholder.png'}
            alt={`${item.firstName} ${item.lastName}`}
            fill
            sizes="96px"
            priority={priority}
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
         </div>
        
         <div className="text-center space-y-1 z-10 w-full">
          <h3 className="text-lg font-black text-slate-900 leading-tight tracking-tight group-hover:text-primary-600 transition-colors truncate">
            {item.firstName} {item.lastName}
          </h3>
          <p className="text-xs text-slate-500 font-semibold truncate w-full px-2 uppercase tracking-widest">
            {item.company?.title || 'Protocol Agent'}
          </p>
         </div>

         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="h-4 w-4 text-primary-600 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
         </div>
      </div>

      <div className="flex flex-col p-5 bg-slate-50 space-y-3">
         <div className="flex items-center justify-between text-xs font-semibold">
           <span className="text-slate-400 uppercase">Contact</span>
           <span className="text-slate-700 truncate max-w-[150px]">{item.email}</span>
         </div>
         <div className="flex items-center justify-between text-xs font-semibold">
           <span className="text-slate-400 uppercase">Phone</span>
           <span className="text-slate-700">{item.phone || 'Unknown'}</span>
         </div>
      </div>
    </Link>
  )
}
