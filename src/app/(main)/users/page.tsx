'use client'

import React, { useEffect } from 'react'
import { UserList } from '@/features/listing/UserList'
import { useExplorerStore } from '@/store/useExplorerStore'

export default function UsersPage() {
  const { setCurrentResource } = useExplorerStore()

  useEffect(() => {
    setCurrentResource('users')
  }, [setCurrentResource])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
        <header className="mb-16 flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900">
            Active Members
          </h1>
          <p className="text-slate-500 font-medium text-lg lg:text-xl max-w-2xl leading-relaxed">
            Manage and explore our global network of verified agents and protocol contributors.
          </p>
        </header>

        <section className="animate-in fade-in duration-700 delay-200">
          <UserList />
        </section>
      </div>
    </div>
  )
}
