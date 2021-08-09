import Image from "next/image"

const Thumbnail = ({ id = 0, image , title = "" }) => {

  return (
    <div className="relative w-full h-full">
      <Image
        className="rounded-lg"
        src={image || "https://picsum.photos/200/300?blur=3&random=" + id}
        alt={title}
        layout="fill"
        loading="lazy"
        objectFit="cover"
      />
    </div>
  )
}

export default Thumbnail
