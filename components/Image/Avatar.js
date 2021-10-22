import Image from "next/image"

const Avatar = ({ image, name = "", size = 40, className = "" }) => {
  const url = new URL(image)

  return (
    <>
      {process.env.imageHost.includes(url.hostname) ? (
        <Image
          className={`object-cover h-10 rounded-full ${className}`}
          src={image || "/default-avatar.png"}
          alt={name}
          title={name}
          width={size}
          height={size}
        />
      ) : (
        <img
          className={`object-cover rounded-full ${className}`}
          src={image || "https://picsum.photos/200/300?blur=3&random=" + id}
          alt={name}
          title={name}
          width={size}
          height={size}
        />
      )}
    </>
  )
}

export default Avatar
