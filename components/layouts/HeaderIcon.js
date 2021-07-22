function HeaderIcon({ Icon, active }) {
  return (
    <div className="h-8 flex items-center cursor-pointer md:hover:bg-gray-100 rounded-xl active:border-b-2 group">
      <Icon className={`h-6 px-2 md:px-10 text-gray-500 group-hover:text-blue-500 ${active && "text-blue-500"} `}/>
    </div>
  )
}

export default HeaderIcon
