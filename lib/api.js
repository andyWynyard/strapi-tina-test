export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  }${path}`
}

export async function fetchAPI(path) {
  const requesturl = getStrapiURL(path)
  console.log(`requesturl`, requesturl)
  const response = await fetch(requesturl)
  const data = await response.json()
  return data
}
