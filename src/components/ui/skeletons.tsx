import React from 'react'

const GlassContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-md bg-white/70 border border-white/20 shadow-sm transition-all duration-300 ${className}`}>
    {children}
  </div>
)

export const ProductSkeleton = ({ mode = 'grid' }: { mode?: 'grid' | 'list' }) => {
  if (mode === 'list') {
    return (
      <GlassContainer className="flex items-center gap-6 p-4 rounded-xl animate-pulse">
        <div className="h-16 w-16 flex-shrink-0 rounded bg-slate-100" />
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-slate-100" />
            <div className="h-4 w-1/3 rounded bg-slate-200" />
          </div>
          <div className="h-3 w-1/2 rounded bg-slate-100" />
        </div>
      </GlassContainer>
    )
  }

  return (
    <GlassContainer className="flex flex-col rounded-xl overflow-hidden animate-pulse h-full">
      <div className="aspect-[16/10] bg-slate-100" />
      <div className="p-5 flex-grow space-y-3">
        <div className="h-3 w-20 rounded bg-slate-100" />
        <div className="h-5 w-3/4 rounded bg-slate-200" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-4/5 rounded bg-slate-100" />
        </div>
        <div className="pt-4 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-slate-100" />
          <div className="h-5 w-16 rounded-full bg-slate-100" />
        </div>
      </div>
    </GlassContainer>
  )
}

export const PostSkeleton = ({ mode = 'grid' }: { mode?: 'grid' | 'list' }) => {
  if (mode === 'list') {
    return (
      <GlassContainer className="flex items-center gap-6 p-4 rounded-xl animate-pulse">
        <div className="h-16 w-16 flex-shrink-0 rounded bg-primary-50/50" />
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-primary-50/50" />
            <div className="h-4 w-1/3 rounded bg-primary-100/50" />
          </div>
          <div className="h-3 w-1/2 rounded bg-primary-50/50" />
        </div>
      </GlassContainer>
    )
  }

  return (
    <GlassContainer className="flex flex-col rounded-xl overflow-hidden animate-pulse h-full">
      <div className="aspect-[16/10] bg-primary-50/30" />
      <div className="p-5 flex-grow space-y-3">
        <div className="h-3 w-20 rounded bg-primary-50/50" />
        <div className="h-5 w-3/4 rounded bg-primary-100/50" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-primary-50/50" />
          <div className="h-3 w-4/5 rounded bg-primary-50/50" />
        </div>
        <div className="pt-4 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-primary-50/50" />
          <div className="h-5 w-16 rounded-full bg-primary-50/50" />
        </div>
      </div>
    </GlassContainer>
  )
}

export const UserSkeleton = ({ mode = 'grid' }: { mode?: 'grid' | 'list' }) => {
  if (mode === 'list') {
    return (
      <GlassContainer className="flex items-center gap-6 p-4 rounded-xl animate-pulse">
        <div className="h-16 w-16 flex-shrink-0 rounded-full bg-primary-50/50" />
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-primary-50/50" />
            <div className="h-4 w-1/3 rounded bg-primary-100/50" />
          </div>
          <div className="h-3 w-1/2 rounded bg-primary-50/50" />
        </div>
      </GlassContainer>
    )
  }

  return (
    <GlassContainer className="flex flex-col rounded-xl overflow-hidden animate-pulse h-full">
      <div className="p-6 flex flex-col items-center bg-white/50 border-b border-white/20">
        <div className="h-24 w-24 rounded-full bg-primary-50/50 mb-4" />
        <div className="space-y-2 flex flex-col items-center w-full">
          <div className="h-5 w-2/3 rounded bg-primary-100/50" />
          <div className="h-3 w-1/2 rounded bg-primary-50/50" />
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="h-3 w-12 rounded bg-slate-100" />
          <div className="h-3 w-24 rounded bg-slate-100" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-12 rounded bg-slate-100" />
          <div className="h-3 w-24 rounded bg-slate-100" />
        </div>
      </div>
    </GlassContainer>
  )
}

export const ItemListSkeleton = ({ 
  count = 12, 
  mode = 'grid',
  type = 'products'
}: { 
  count?: number, 
  mode?: 'grid' | 'list',
  type?: 'products' | 'posts' | 'users'
}) => {
  const Skeletons = {
    products: ProductSkeleton,
    posts: PostSkeleton,
    users: UserSkeleton
  }
  const SkeletonComponent = Skeletons[type]

  return (
    <div className={mode === 'grid' 
      ? "grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
      : "flex flex-col gap-6"
    }>
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} mode={mode} />
      ))}
    </div>
  )
}

export const RegistryStatsSkeleton = () => (
  <div className="flex items-center justify-center gap-8 py-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex flex-col items-center gap-2">
        <div className="h-8 w-16 bg-slate-100 rounded-lg" />
        <div className="h-3 w-20 bg-slate-50 rounded-md" />
      </div>
    ))}
  </div>
)

export const DetailSkeleton = () => (
  <main className="min-h-screen bg-white text-slate-900">
    <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
      <div className="h-4 w-32 bg-slate-100 rounded mb-12 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <section className="lg:col-span-5">
          <div className="aspect-[4/5] rounded-2xl bg-slate-100 animate-pulse border border-slate-100" />
        </section>
        <section className="lg:col-span-7 pt-4 space-y-6">
          <div className="flex flex-col gap-4 mb-12 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 bg-primary-100 rounded-md" />
              <div className="h-4 w-24 bg-slate-100 rounded" />
            </div>
            <div className="h-12 w-3/4 bg-slate-200 rounded-lg" />
            <div className="h-12 w-1/2 bg-slate-200 rounded-lg" />
            <div className="h-4 w-full bg-slate-100 rounded mt-4" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-10 border-t border-slate-100 animate-pulse">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="flex flex-col gap-2">
                 <div className="h-3 w-24 bg-slate-100 rounded" />
                 <div className="h-5 w-32 bg-slate-200 rounded" />
               </div>
             ))}
          </div>
          <div className="mt-12 pt-12 flex gap-4 border-t border-slate-100 animate-pulse">
            <div className="h-14 flex-1 rounded-lg bg-slate-100" />
            <div className="h-14 flex-1 rounded-lg bg-slate-50" />
          </div>
        </section>
      </div>
    </div>
  </main>
)
