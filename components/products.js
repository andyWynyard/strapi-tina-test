import React from 'react'
import Card from './card'

const Products = ({ products }) => {
  return (
    <div>
      <div>
        {products?.map((product) => (
          <Card product={product} key={`product__${product.slug}`}></Card>
        ))}
      </div>
    </div>
  )
}

export default Products
