import App from 'next/app'
import Head from 'next/head'
import { createContext, useMemo } from 'react'

import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from 'react-tinacms-strapi'
import { TinaCMS, TinaProvider, useCMS } from 'tinacms'

import { fetchAPI } from '@/lib/api'
import { getStrapiMedia } from '@/lib/media'

import '../styles/globals.css'

export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
  const { global } = pageProps
  const cms = useMemo(
    () =>
      new TinaCMS({
        toolbar: pageProps.preview,
        enabled: pageProps.preview,
        apis: {
          strapi: new StrapiClient(process.env.NEXT_PUBLIC_STRAPI_URL),
        },
        media: new StrapiMediaStore(process.env.NEXT_PUBLIC_STRAPI_URL),
      }),
    []
  )

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
      </Head>
      <GlobalContext.Provider value={global}>
        <TinaProvider cms={cms}>
          <StrapiProvider onLogin={enterEditMode} onLogout={exitEditMode}>
            <EditButton />
            <Component {...pageProps} />
          </StrapiProvider>
        </TinaProvider>
      </GlobalContext.Provider>
    </>
  )
}

const enterEditMode = () =>
  fetch('/api/preview').then(() => {
    window.location.href = window.location.pathname
  })

const exitEditMode = () =>
  fetch('/api/reset-preview').then(() => {
    window.location.reload()
  })

export const EditButton = () => {
  const cms = useCMS()
  return (
    <button
      className="tina-cms-button"
      onClick={() => (cms.enabled ? cms.disable() : cms.enable())}
    >
      {cms.enabled ? 'Exit God Mode' : 'Enter God Mode'}
    </button>
  )
}
MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx)
  const global = await fetchAPI('/global')
  return { ...appProps, pageProps: { global } }
}

export default MyApp
