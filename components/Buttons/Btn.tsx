function BigBtn({
  Icon,
  title,
  color,
  onClick,
}: {
  title?: String
  Icon?: any
  color?: String
  onClick?: any
}) {
  return (
    <button
      onClick={onClick}
      className={`btn m-2 text-gray-100 ${color ? color : "bg-blue-600"}`}
    >
      {Icon && <Icon className="h-6 w-6" />}
      {title && <span className="title-font font-medium">{title}</span>}
    </button>
  )
}

export default BigBtn
