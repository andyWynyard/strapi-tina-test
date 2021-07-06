import React, { useContext } from 'react'
import Head from 'next/head'
import { GlobalContext } from '../pages/_app'
import { getStrapiMedia } from '@/lib/media'

const SEO = ({ seo }) => {
  const { defaultSeo, siteName } = useContext(GlobalContext)
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  }

  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`,
    shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  }
  // console.log(`fullSeo`, fullSeo)

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.product && <meta property="og:product" content="product" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default SEO
