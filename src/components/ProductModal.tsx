'use client'
import Image from 'next/image'
import { Product } from '@/types/product'
import { FaStar } from 'react-icons/fa'
import { useEffect } from 'react'

type Props = {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
    console.log(product);
    
  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating)
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} size={18} color={i < rounded ? '#facc15' : '#e5e7eb'} />
    ))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content fancy-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="fancy-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-image-wrapper">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="modal-image"
          />
        </div>

        <div className="modal-body">
          <span className="modal-category-badge">{product.category}</span>

          <h2 className="modal-title">{product.title}</h2>

          <div className="modal-rating">
            {renderStars(product.rating_rate)}
            <span className="rating-count">
              ({product.rating_count} reviews)
            </span>
          </div>

          <p className="modal-price">$ {product.price}</p>

          <p className="modal-description">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
