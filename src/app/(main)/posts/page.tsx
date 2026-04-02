'use client'

import React, { useEffect } from 'react'
import { PostList } from '@/features/listing/PostList'
import { useExplorerStore } from '@/store/useExplorerStore'
import dynamic from 'next/dynamic'
const ResourceFilters = dynamic(() => import('@/features/filters/ResourceFilters').then(mod => mod.ResourceFilters), {
  ssr: false,
  loading: () => <div className="h-11 w-full bg-slate-50 rounded-xl animate-pulse max-w-lg mx-auto" />
})

export default function PostsPage() {
  const { setCurrentResource } = useExplorerStore()

  useEffect(() => {
    setCurrentResource('posts')
  }, [setCurrentResource])

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
        <header className="mb-12 flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900">
            Latest Reports
          </h1>
          <p className="text-slate-500 font-medium text-lg lg:text-xl max-w-2xl leading-relaxed">
            Stay updated with our latest findings, protocol changes, and operational reports.
          </p>
        </header>

        <section className="mb-12">
           <ResourceFilters />
        </section>

        <section className="animate-in fade-in duration-700 delay-200">
          <PostList />
        </section>
      </div>
    </main>
  )
}
