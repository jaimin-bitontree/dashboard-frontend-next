import { useEffect, useState } from 'react'
import { getProducts } from '@/services/product.api'
import { Product } from '@/types/product'
import { toast } from 'react-toastify'
import { useProfileContext } from '@/context/ProfileContext'

export const useDashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(8)
  const [total, setTotal] = useState(0)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState<number | ''>('')
  const [maxPrice, setMaxPrice] = useState<number | ''>('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [search, category, minPrice, maxPrice])

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getProducts(
          page,
          limit,
          search,
          category || undefined,
          minPrice === '' ? undefined : minPrice,
          maxPrice === '' ? undefined : maxPrice
        )

        setProducts(data.products)
        setTotal(data.total)
      } catch (err) {
        console.log(err)

        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, search, category, minPrice, maxPrice])

  const nextPage = () => {
    if (page < Math.ceil(total / limit)) {
      setPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  return {
    products,
    page,
    total,
    limit,
    loading,
    error,

    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,

    nextPage,
    prevPage,
    selectedProduct,
    setSelectedProduct,
  }
}
