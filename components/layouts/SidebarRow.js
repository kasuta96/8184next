import Image from "next/image";

function SidebarRow({ src, Icon, title, link }) {
  return (
    <a
      href={link}
      className="flex items-center p-2 space-x-2 hover:bg-gray-200 rounded-md"
    >
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {Icon && <Icon className="h-6 w-6" />}
      <p className="">{title}</p>
    </a>
  );
}

export default SidebarRow;
