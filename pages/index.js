import { fetchAPI } from '@/lib/api'
import Head from 'next/head'
import Image from 'next/image'
import Container from '@/components/container'
import Products from '@/components/products'
import { fetchGraphql } from 'react-tinacms-strapi'
import styles from '../styles/Home.module.css'

export default function Home({ products, categories, homepage }) {
  // console.log(`products`, products)
  console.log(`categories`, categories)
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

export async function getStaticProps({ preview, previewData }) {
  const productData = await fetchGraphql(
    process.env.NEXT_PUBLIC_STRAPI_URL,
    `
    query {
      products {
         title 
          slug 
          categories {
            name
          }
          image {
            url
          }
      }
      categories {
        name
        slug
      }
      homepage {
        hero {
          title
        }
      }
    }`
  )

  if (preview) {
    return {
      props: {
        products: productData.data.products,
        categories: productData.data.categories,
        homepage: productData.data.homepage,
        preview,
        ...previewData,
      },
    }
  }

  return {
    props: {
      products: productData.data.products,
      categories: productData.data.categories,
      homepage: productData.data.homepage,
      preview: false,
    },
    revalidate: 1,
  }
}
