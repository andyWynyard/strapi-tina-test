import React from 'react'
import ReactMarkdown from 'react-markdown'
import Moment from 'moment'
import { fetchAPI } from '@/lib/api'
import { getStrapiMedia } from '@/lib/media'
import Container from '@/components/container'
import Images from '@/components/images'
import SEO from '@/components/seo'

const Product = ({ product, categories }) => {
  const imageUrl = getStrapiMedia(product.image)
  const seo = {
    metaTitle: product.title,
    metaDescription: product.description,
    shareImage: product.image,
    product: true,
  }
  return (
    <Container categories={categories}>
      <SEO seo={seo} />
      <div>
        <h1>Product</h1>
        <Images image={product.image} />
        <h1>{product.title}</h1>
      </div>
      <div>
        <p>{product.description}</p>
      </div>
      <div>
        <p>{`Price: $${product.price}`}</p>
      </div>
    </Container>
  )
}

export async function getStaticPaths() {
  const products = await fetchAPI('/products')

  return {
    paths: products.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const products = await fetchAPI(
    `/products?slug=${params.slug}&status=published`
  )
  const categories = await fetchAPI(`/categories`)

  return {
    props: {
      product: products[0],
      categories,
    },
    revalidate: 1,
  }
}

export default Product
