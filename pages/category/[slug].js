import React from 'react'
import Products from '@/components/products'
import { fetchAPI } from '@/lib/api'
import Container from '@/components/container'
import SEO from '@/components/seo'

const Category = ({ category, categories }) => {
  // console.log(`category`, category)
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} products`,
  }
  return (
    <Container categories={categories}>
      <SEO seo={seo} />
      <div>
        <div>
          <h1>{`Category: ${category.name}`}</h1>
          <Products products={category.products} />
        </div>
      </div>
    </Container>
  )
}

export async function getStaticPaths() {
  const categories = await fetchAPI('/categories')
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  }
}
export async function getStaticProps({ params }) {
  const category = await fetchAPI(`/categories?slug=${params.slug}`)
  const categories = await fetchAPI(`/categories`)

  return {
    props: {
      category: category[0],
      categories,
    },
    revalidate: 1,
  }
}

export default Category
