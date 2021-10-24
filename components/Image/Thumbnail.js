import Image from "next/image"

const Thumbnail = ({ id = 0, image, title = "" }) => {
  // if have image url and hostname is NOT in imageHost list (next.config.js)
  if (image) {
    const url = new URL(image)
    if (!process.env.imageHost.includes(url.hostname)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-lg object-cover h-full w-full" src={image} alt={title} loading="lazy" />
      )
    }
  }

  return (
    <Image
      className="rounded-lg"
      src={image || "https://picsum.photos/200/300?blur=3&random=" + id}
      alt={title}
      layout="fill"
      loading="lazy"
      objectFit="cover"
    />
  )
}

export default Thumbnail
