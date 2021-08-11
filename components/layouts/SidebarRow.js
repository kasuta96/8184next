import Avatar from "../Image/Avatar";
import { useRouter } from 'next/router'

function SidebarRow({ image, Icon, title, link, avatar }) {
  const router = useRouter()

  return (
    <div
      onClick={link && (() => router.push(link))}
      className="flex items-center p-2 space-x-2 hover:bg-gray-200 rounded-md cursor-pointer"
    >
      {avatar && (
        <Avatar image={image} size={30} />
      )}
      {Icon && <Icon className="h-6 w-6" />}
      <p className="">{title}</p>
    </div>
  );
}

export default SidebarRow;
