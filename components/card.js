import React from 'react'
import Link from 'next/link'
import Images from './images'

const Card = ({ product }) => {
  return (
    <div style={{ margin: '20px 30px' }}>
      <Link href={`/product/${product.slug}`}>
        <a>
          <div
            style={{
              padding: '20px 30px',
              border: '1px solid #a4a4a4',
              borderRadius: '6px',
            }}
          >
            <div>
              <Images image={product.image} />
            </div>
            <div>
              <p>{product.title}</p>
              <p>{product?.category?.name}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card
