import { api } from './axios'

export const getProducts = async (
  page = 1,
  limit = 8,
  search = '',
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  })

  if (category) params.append('category', category)
  if (minPrice !== undefined) params.append('minPrice', String(minPrice))
  if (maxPrice !== undefined) params.append('maxPrice', String(maxPrice))

  const res = await api.get(`/products?${params.toString()}`)
  return res.data
}
