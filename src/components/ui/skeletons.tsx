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
        <div className="h-16 w-16 flex-shrink-0 rounded bg-amber-50/50" />
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-amber-50/50" />
            <div className="h-4 w-1/3 rounded bg-amber-100/50" />
          </div>
          <div className="h-3 w-1/2 rounded bg-amber-50/50" />
        </div>
      </GlassContainer>
    )
  }

  return (
    <GlassContainer className="flex flex-col rounded-xl overflow-hidden animate-pulse h-full">
      <div className="aspect-[16/10] bg-amber-50/30" />
      <div className="p-5 flex-grow space-y-3">
        <div className="h-3 w-20 rounded bg-amber-50/50" />
        <div className="h-5 w-3/4 rounded bg-amber-100/50" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-amber-50/50" />
          <div className="h-3 w-4/5 rounded bg-amber-50/50" />
        </div>
        <div className="pt-4 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-amber-50/50" />
          <div className="h-5 w-16 rounded-full bg-amber-50/50" />
        </div>
      </div>
    </GlassContainer>
  )
}

export const UserSkeleton = ({ mode = 'grid' }: { mode?: 'grid' | 'list' }) => {
  if (mode === 'list') {
    return (
      <GlassContainer className="flex items-center gap-6 p-4 rounded-xl animate-pulse">
        <div className="h-16 w-16 flex-shrink-0 rounded-full bg-green-50/50" />
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-green-50/50" />
            <div className="h-4 w-1/3 rounded bg-green-100/50" />
          </div>
          <div className="h-3 w-1/2 rounded bg-green-50/50" />
        </div>
      </GlassContainer>
    )
  }

  return (
    <GlassContainer className="flex flex-col rounded-xl overflow-hidden animate-pulse h-full">
      <div className="p-6 flex flex-col items-center bg-white/50 border-b border-white/20">
        <div className="h-24 w-24 rounded-full bg-green-50/50 mb-4" />
        <div className="space-y-2 flex flex-col items-center w-full">
          <div className="h-5 w-2/3 rounded bg-green-100/50" />
          <div className="h-3 w-1/2 rounded bg-green-50/50" />
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
