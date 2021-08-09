import Image from "next/image"

const Avatar = ({ image , name = "", size = 40 }) => {

  return (
    <Image
      className="object-cover h-10 rounded-full"
      src={image || "/default-avatar.png"}
      alt={name}
      title={name}
      width={size}
      height={size}
    />
  )
}

export default Avatar
