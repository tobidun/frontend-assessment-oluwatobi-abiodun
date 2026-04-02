'use client'

import React, { useEffect, Fragment } from 'react'
import Image from 'next/image'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { fetchUsers } from '@/lib/api'
import { UserCard } from '@/components/user/UserCard'
import { DummyUser } from '@/types'
import { ItemListSkeleton } from '@/components/ui/skeletons'
import { ErrorState } from '@/components/ui/ErrorState'
import { useExplorerStore } from '@/store/useExplorerStore'

export const UserList = () => {
  const { ref, inView } = useInView()
  const { searchQuery, viewMode } = useExplorerStore()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    refetch
  } = useInfiniteQuery({
    queryKey: ['users', searchQuery],
    queryFn: ({ pageParam = 0 }) => fetchUsers({ 
      pageParam, 
      limit: 12, 
      query: searchQuery 
    }),
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit
      return nextSkip < lastPage.total ? nextSkip : undefined
    },
    initialPageParam: 0,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  })

  // Infinite scroll trigger
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // Full screen error ONLY if we have no data at all
  if (isError && !data) {
    return (
      <ErrorState 
        onRetry={() => refetch()}
        showHome={false}
      />
    )
  }

  // Initial loading state
  if (isLoading && !data) {
    return (
      <div className="pt-2">
        <ItemListSkeleton type="users" count={8} mode={viewMode} />
      </div>
    )
  }

  const allItems = data?.pages?.flatMap((page) => page.users || []) || []

  // Empty state
  if (!isLoading && allItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4 animate-in fade-in duration-700">
         <div className="relative h-48 w-48 mb-6">
           <Image 
              src="/error.png" 
              alt="No items found" 
              fill 
              sizes="192px"
              className="object-contain"
            />
         </div>
         <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">No Entities Found</h3>
         <p className="text-slate-500 max-w-sm mx-auto font-medium text-sm leading-relaxed">
           The current registry contains no users matching your search parameters.
         </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Grid vs List Display */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "flex flex-col gap-4"
      }>
        {data?.pages.map((page, pageIdx) => (
          <Fragment key={pageIdx}>
            {page.users?.map((item: DummyUser, idxLog: number) => (
              <UserCard
                key={item.id}
                item={item}
                priority={pageIdx === 0 && idxLog < 4}
              />
            ))}
          </Fragment>
        ))}
      </div>

      {/* Infinite Scroll & Loading Footer */}
      <div ref={ref} className="pt-16 pb-32 min-h-[200px]">
        {hasNextPage && (
          <div className="space-y-4">
             <ItemListSkeleton type="users" count={viewMode === 'grid' ? 4 : 2} mode={viewMode} />
          </div>
        )}
        
        {!hasNextPage && allItems.length > 0 && (
          <div className="text-center py-8">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">End of Registry</span>
          </div>
        )}
      </div>
    </div>
  )
}
