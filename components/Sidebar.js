import { NewspaperIcon, RssIcon, UserGroupIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/client";
import SidebarRow from "./layouts/SidebarRow";

function Sidebar() {
  const [session, loading] = useSession();

  return (
    <div className="sidebar z-40 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:shadow-r-md md:translate-x-0 transition duration-200 ease-in-out">
      <div className="px-2 py-4 w-48 bg-white md:bg-gray-100 sticky top-12 overflow-y-scroll">
        {session && <SidebarRow src={session.user.image} title={session.user.name} />}
        <SidebarRow Icon={RssIcon} title="Rss" />
        <SidebarRow Icon={NewspaperIcon} title="Posts" />
        <SidebarRow Icon={UserGroupIcon} title="Group" />
      </div>
    </div>
  );

}

export default Sidebar
