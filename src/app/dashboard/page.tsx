'use client'
import '@/styles/dashboard.css'
import Image from 'next/image'

import { CgProfile } from 'react-icons/cg'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { useProfileContext } from '@/context/ProfileContext'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { api } from '@/services/axios'
import { useDashboard } from '@/hooks/useDashboard'
import ProductModal from '@/components/ProductModal'

export default function Dashboard() {
  const router = useRouter()
  const { profile, setProfile } = useProfileContext()

  const {
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
    setSelectedProduct,
    selectedProduct
  } = useDashboard()

  const handleLogout = async () => {
    await api.post('/auth/logout')
    setProfile(null)
    router.push('/login')
  }

  return (
    <>
      {/*  NAVBAR  */}
      <nav className="navbar">
        <h2 className="navbar-title">Dashboard</h2>

        <div className="navbar-actions">
          <Button onClick={() => router.push('/profile')}>
            <CgProfile />
            Profile
          </Button>

          <Button onClick={handleLogout}>
            <RiLogoutCircleLine />
            Logout
          </Button>
        </div>
      </nav>

      {/*  CONTENT  */}
      <main className="dashboard-content">
        <h3 className="welcome-text">Hello {profile?.name}, welcome back</h3>
        
        {/*  FILTER BAR  */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : '')
            }
            className="price-input"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : '')
            }
            className="price-input"
          />
        </div>

        {loading && <p className="info-text">Loading products...</p>}
        {error && <p className="error-text">{error}</p>}

        {/*  PRODUCT GRID  */}
        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="product-image"
              />

              <div className="product-card-content">
                <span className="category">{product.category}</span>
                <h4>{product.title}</h4>
                <p className="price">$ {product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/*  PAGINATION  */}
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={prevPage}
          >
             Prev
          </button>

          <span className="pagination-info">
            Page <strong>{page}</strong> of {Math.ceil(total / limit)}
          </span>

          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(total / limit)}
            onClick={nextPage}
          >
            Next 
          </button>
        </div>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </main>
    </>
  )
}
