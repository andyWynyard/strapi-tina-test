import { fetchAPI } from '@/lib/api'
import Head from 'next/head'
import Image from 'next/image'
import Container from '@/components/container'
import Products from '@/components/products'

import styles from '../styles/Home.module.css'

export default function Home({ products, categories, homepage }) {
  // console.log(`products`, products)
  // console.log(`categories`, categories)
  // console.log(`homepage`, homepage)
  return (
    <Container categories={categories}>
      <div>
        <div>
          <h1>{homepage?.hero?.title}</h1>
          <Products products={products} />
        </div>
      </div>
    </Container>
  )
}

export async function getStaticProps() {
  const [products, categories, homepage] = await Promise.all([
    fetchAPI('/products?status=published'),
    fetchAPI('/categories'),
    fetchAPI('/homepage'),
  ])

  return {
    props: {
      products,
      categories,
      homepage,
    },
    revalidate: 1,
  }
}
