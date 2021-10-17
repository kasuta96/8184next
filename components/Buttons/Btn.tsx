function BigBtn({ Icon, title, color, onClick }: { title?: string; Icon?: any; color?: string; onClick?: any }) {
  return (
    <button onClick={onClick} aria-label={title} className={`btn m-2 text-gray-100 ${color ? color : "bg-blue-600"}`}>
      {Icon && <Icon className="h-6 w-6" />}
      {title && <span>{title}</span>}
    </button>
  )
}

export default BigBtn
