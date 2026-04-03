'use client'

import React, { useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useExplorerStore, ResourceType } from '@/store/useExplorerStore'
import dynamic from 'next/dynamic'
const SearchInterface = dynamic(() => import('@/features/search/SearchInterface').then(mod => mod.SearchInterface), {
  ssr: false,
  loading: () => <div className="h-10 w-full bg-slate-50 rounded-xl animate-pulse" />
})
import { 
  Menu, 
  X,
  LayoutGrid, 
  List
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navItems: { id: ResourceType; label: string }[] = [
  { id: 'products', label: 'Products' },
  { id: 'posts', label: 'Posts' },
  { id: 'users', label: 'Users' },
]

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract resource from pathname
  const currentResource = useMemo(() => {
    if (pathname.startsWith('/products')) return 'products'
    if (pathname.startsWith('/posts')) return 'posts'
    if (pathname.startsWith('/users')) return 'users'
    return 'products'
  }, [pathname])
  
  const { 
    viewMode, 
    setViewMode,
    setCurrentResource // Using the store's isolation logic
  } = useExplorerStore()
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleResourceSwitch = (id: ResourceType) => {
    setIsMobileMenuOpen(false)
    setCurrentResource(id) // Pre-emptively reset filters/search
    router.push(`/${id}`)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-slate-100 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 h-full grid grid-cols-2 lg:grid-cols-3 items-center">
          
          {/* Left: Brand/Logo */}
          <div className="flex justify-start">
            <Link 
              href="/"
              className="relative h-10 w-28 group cursor-pointer"
              aria-label="CheckIt Protocol Home"
            >
              <Image 
                src="/checkit-logo.png" 
                alt="CheckIt Protocol Logo"
                fill
                sizes="112px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Middle: Navigation - Absolutely centered */}
          <nav className="hidden lg:flex justify-center items-center gap-9 h-full">
            {navItems.map((item) => {
              const isActive = currentResource === item.id
              return (
                  <button
                    key={item.id}
                    onClick={() => handleResourceSwitch(item.id)}
                    aria-label={`Switch to ${item.label} registry`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex flex-col items-center group py-2 focus-visible:outline-primary-600 outline-none`}
                  >
                  <span className={`text-[10px] font-black transition-all duration-300 uppercase tracking-[0.25em] ${
                    isActive 
                    ? 'text-primary-600' 
                    : 'text-slate-400 group-hover:text-slate-900'
                  }`}>
                    {item.label}
                  </span>
                  {/* High-fidelity full-width indicator line */}
                  <div className={`mt-1 h-[2px] bg-primary-600 transition-all duration-500 rounded-full ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-40'
                  }`} />
                </button>
              )
            })}
          </nav>

          {/* Right: Search & Controls */}
          <div className="flex items-center justify-end gap-5">
            {/* Extremely compact Search */}
            <div className="hidden md:block w-40 lg:w-56">
               <SearchInterface />
            </div>

            {/* View Switcher */}
            <div className="hidden sm:flex bg-slate-50 rounded-lg p-0.5 border border-slate-200 h-9 items-center">
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setViewMode('grid')}
                  aria-label="Switch to grid view"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setViewMode('list')}
                  aria-label="Switch to list view"
                >
                  <List className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Mobile Nav Toggle */}
            <Button 
              variant="ghost"
              size="icon"
              icon={isMobileMenuOpen ? X : Menu}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 lg:hidden p-8 animate-in slide-in-from-right duration-300 overflow-y-auto">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-3">
              {navItems.map((item) => {
                const isActive = currentResource === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleResourceSwitch(item.id)}
                    className={`flex items-center justify-between px-6 py-5 rounded-2xl text-base font-bold transition-all ${
                      isActive 
                      ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20' 
                      : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
            
            <div className="pt-4">
              <SearchInterface />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
