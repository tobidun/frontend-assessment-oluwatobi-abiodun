import { renderHook, act } from '@testing-library/react'
import { useExplorerStore } from '@/store/useExplorerStore'

describe('Registry Store Protocol (High-Fidelity)', () => {
  beforeEach(() => {
    act(() => {
      // Force reset the store to baseline protocol state before each test
      useExplorerStore.getState().setCurrentResource('products')
      useExplorerStore.getState().setSearchQuery('')
      useExplorerStore.getState().setActiveFilter('all')
      useExplorerStore.getState().setViewMode('grid')
    })
  })

  test('1. Initial Registry Baseline: should boot with high-fidelity defaults', () => {
    const { result } = renderHook(() => useExplorerStore())
    
    expect(result.current.currentResource).toBe('products')
    expect(result.current.searchQuery).toBe('')
    expect(result.current.activeFilter).toBe('all')
    expect(result.current.viewMode).toBe('grid')
  })

  test('2. Protocol Isolation: should prevent cross-resource data pollution', () => {
    const { result } = renderHook(() => useExplorerStore())
    
    // Inject complex search data into Product registry
    act(() => {
      result.current.setSearchQuery('protocol-alpha-x')
      result.current.setActiveFilter('humanoid-assets')
    })
    
    expect(result.current.searchQuery).toBe('protocol-alpha-x')
    
    // Shift to Reports (Posts) registry
    act(() => {
      result.current.setCurrentResource('posts')
    })
    
    // VERIFY: Protocol ensures state is purged for new resource context
    expect(result.current.currentResource).toBe('posts')
    expect(result.current.searchQuery).toBe('')
    expect(result.current.activeFilter).toBe('all')
  })

  test('3. View Portal Transition: should seamlessly switch between grid and list modes', () => {
    const { result } = renderHook(() => useExplorerStore())
    
    expect(result.current.viewMode).toBe('grid')
    
    act(() => {
      result.current.setViewMode('list')
    })
    
    expect(result.current.viewMode).toBe('list')
  })

  test('4. Granular Filtering: should persist specific category selections', () => {
    const { result } = renderHook(() => useExplorerStore())
    
    expect(result.current.activeFilter).toBe('all')
    
    act(() => {
      result.current.setActiveFilter('intelligence-core')
    })
    
    expect(result.current.activeFilter).toBe('intelligence-core')
  })

  test('5. Real-time Search Synchronization: should update query state as user input streams', () => {
    const { result } = renderHook(() => useExplorerStore())
    
    expect(result.current.searchQuery).toBe('')
    
    act(() => {
      result.current.setSearchQuery('agent-007')
    })
    
    expect(result.current.searchQuery).toBe('agent-007')
    
    // Ensure backspace or clearing works for fresh search
    act(() => {
      result.current.setSearchQuery('')
    })
    
    expect(result.current.searchQuery).toBe('')
  })
})
