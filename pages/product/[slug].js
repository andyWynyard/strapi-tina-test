import React from 'react'
import ReactMarkdown from 'react-markdown'
import Moment from 'moment'
import { fetchAPI } from '@/lib/api'
import { getStrapiMedia } from '@/lib/media'
import Container from '@/components/container'
import Images from '@/components/images'
import SEO from '@/components/seo'
import { InlineInlineWysiwyg } from 'react-tinacms-editor'
import { fetchGraphql } from 'react-tinacms-strapi'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineText, InlineImage } from 'react-tinacms-inline'

const Product = ({ product: initialProduct, categories, preview }) => {
  const cms = useCMS()
  const formConfig = {
    id: initialProduct.id,
    label: 'Blog Post',
    initialValues: initialProduct,
    onSubmit: async (values) => {
      const saveMutation = `
      mutation UpdateProductMutation(
        $id: ID!
        $title: String
        $description: String
        $coverImageId: ID
        $price:Float
      ) {
        updateProduct(
          input: {
            where: { id: $id }
            data: {
              title: $title
              description: $description
              price: $price
              image: $coverImageId
            }
          }
        ) {
          product {
            id
            title
          }
        }
      }`
      const response = await cms.api.strapi.fetchGraphql(saveMutation, {
        id: values.id,
        title: values.title,
        content: values.description,
        coverImageId: values.image.id,
      })
      if (response.data) {
        cms.alerts.success('Changes Saved')
      } else {
        cms.alertslerts.error('Broken')
      }
    },
    fields: [],
  }
  const [product, form] = useForm(formConfig)
  usePlugin(form)

  console.log(`product`, product)
  console.log(`preview`, preview)

  // const imageUrl = getStrapiMedia(product.image)
  const seo = {
    metaTitle: initialProduct.title,
    metaDescription: initialProduct.description,
    shareImage: initialProduct.image,
    product: true,
  }
  console.log(`product`, product)
  return (
    <div preview={{ preview }}>
      <InlineForm form={form} initialStatus={'active'}>
        {/* <Container categories={categories}> */}
        {/* <SEO seo={seo} /> */}
        <div>
          <h1>Product</h1>
          <InlineImage
            name="image.id"
            uploadDir={() => '/'}
            parse={(media) => media.id}
          >
            {() => <Images image={product.image} />}
          </InlineImage>
          <h5>Title</h5>
          <InlineText name="title" />
        </div>
        <div>
          <h5>Description</h5>
          <InlineText name="description" />
        </div>
        <div>
          <p>{`Price: $${initialProduct.price}`}</p>
        </div>
        {/* </Container> */}
      </InlineForm>
    </div>
  )
}

export async function getStaticPaths() {
  const productData = await fetchGraphql(
    process.env.NEXT_PUBLIC_STRAPI_URL,
    `
    query {
      products {
          slug 
      } 
    }`
  )

  // console.log(`productData.data`, productData)

  return {
    paths: productData.data.products.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview, previewData }) {
  const productData = await fetchGraphql(
    process.env.NEXT_PUBLIC_STRAPI_URL,
    `
    query {
      products(where: {slug: "${params.slug}"}) {
         title 
         description
          slug 
          categories {
            name
          }
          image {
            url 
            height 
            width
          }
          price
      }
      categories {
        name
        slug
      }
    }`
  )

  if (preview) {
    return {
      props: {
        product: productData.data.products[0],
        categories: productData.data.categories,
        preview,
        ...previewData,
      },
    }
  }
  return {
    props: {
      product: productData.data.products[0],
      categories: productData.data.categories,
      preview: false,
    },
    revalidate: 1,
  }
}

export default Product
