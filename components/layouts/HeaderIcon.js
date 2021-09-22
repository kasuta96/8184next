function HeaderIcon({ Icon, active, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className="h-8 flex items-center cursor-pointer md:hover:bg-200 rounded-xl active:border-b-2 group"
    >
      <Icon className={`h-6 px-2 md:px-10 ${className} ${active ? "text-blue-400" : "text-600"}`} />
    </div>
  )
}

export default HeaderIcon
