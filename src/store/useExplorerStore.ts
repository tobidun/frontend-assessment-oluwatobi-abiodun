import { create } from 'zustand'
import { ResourceType } from '@/types'

interface ExplorerState {
  currentResource: ResourceType;
  searchQuery: string;
  activeFilter: string;
  viewMode: 'grid' | 'list';
  
  setCurrentResource: (resource: ResourceType) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  currentResource: 'products',
  searchQuery: '',
  activeFilter: 'all',
  viewMode: 'grid',

  setCurrentResource: (resource) => set({ 
    currentResource: resource,
    searchQuery: '',     // Reset search on resource switch
    activeFilter: 'all'  // Reset filter on resource switch
  }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setActiveFilter: (filter) => set({ activeFilter: filter }),

  setViewMode: (mode) => set({ viewMode: mode })
}))

export type { ResourceType };
