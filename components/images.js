import { getStrapiMedia } from '@/lib/media'
import image from 'next/image'
import Image from 'next/image'

const Images = ({ image, style }) => {
  const imageUrl = getStrapiMedia(image)
  console.log(`image`, image)
  // const { height, width } = image

  return (
    <Image
      src={imageUrl}
      alt={image?.alternativeText || image?.name}
      width={500}
      height={300}
      layout={'intrinsic'}
      style={style}
    />
  )
}

export default Images
