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
      className={`inline-flex py-2 px-4 m-2 rounded-lg items-center focus:outline-none shadow-lg space-x-2 ${
        color ? color : "bg-blue-300 hover:bg-blue-200 "
      }`}
    >
      {Icon && <Icon className="h-6 w-6" />}
      {title && <span className="title-font font-medium">{title}</span>}
    </button>
  )
}

export default BigBtn
