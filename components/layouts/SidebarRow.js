import Avatar from "../Image/Avatar"

function SidebarRow({ image, Icon, title, onClick, avatar }) {
  return (
    <div
      onClick={onClick ? () => onClick() : undefined}
      className="flex items-center p-2 space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer"
    >
      {avatar && <Avatar image={image} size={30} />}
      {Icon && <Icon className="h-6 w-6" />}
      <p className="">{title}</p>
    </div>
  )
}

export default SidebarRow
