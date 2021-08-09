import Avatar from "../Image/Avatar";

function SidebarRow({ image, Icon, title, link, avatar }) {
  return (
    <a
      href={link}
      className="flex items-center p-2 space-x-2 hover:bg-gray-200 rounded-md"
    >
      {avatar && (
        <Avatar image={image} size={30} />
      )}
      {Icon && <Icon className="h-6 w-6" />}
      <p className="">{title}</p>
    </a>
  );
}

export default SidebarRow;
