import Avatar from "../Image/Avatar"

function SidebarRow({ image, Icon, title, onClick, avatar, active }) {
  return (
    <div
      onClick={onClick ? () => onClick() : undefined}
      className={`flex items-center p-2 space-x-2 hover:bg-200 rounded-md cursor-pointer ${active && "bg-300"}`}
    >
      {avatar && <Avatar image={image} size={30} />}
      {Icon && <Icon className="h-6 w-6" />}
      <p className="">{title}</p>
    </div>
  )
}

export default SidebarRow
