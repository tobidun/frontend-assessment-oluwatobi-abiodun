import { fetchProducts } from '@/lib/api'

// Mocking global fetch for high-fidelity endpoint testing
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ products: [], total: 0 }),
  })
) as jest.Mock

describe('Registry API Protocol', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear()
  })

  test('should construct search endpoint correctly when query is provided', async () => {
    await fetchProducts({ query: 'intelligence', pageParam: 12 })
    
    // In search mode, DummyJSON uses the /search sub-endpoint
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products/search?q=intelligence&limit=12&skip=12'),
      expect.anything()
    )
  })

  test('should construct category endpoint correctly', async () => {
    await fetchProducts({ category: 'humanoid-protocol' })
    
    // In category mode, DummyJSON uses the /category sub-endpoint
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products/category/humanoid-protocol'),
      expect.anything()
    )
  })

  test('should enforce no-store cache strategy for protocol search queries', async () => {
    await fetchProducts({ query: 'master-node' })
    
    const fetchOptions = (global.fetch as jest.Mock).mock.calls[0][1]
    expect(fetchOptions.cache).toBe('no-store')
    expect(fetchOptions.next.revalidate).toBe(0)
  })
})
