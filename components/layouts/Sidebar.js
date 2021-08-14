import { NewspaperIcon, RssIcon, UserGroupIcon, DocumentTextIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import SidebarRow from "./SidebarRow"
import { navWrapperToggle } from './SidebarToogle'

function Sidebar() {
  const [session, loading] = useSession();

  return (
    <div
      id="sidebar"
      onClick={navWrapperToggle}
      className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full md:bg-white md:static md:h-auto md:overflow-y-visible md:pt-0 md:w-48 xl:w-56 md:block hidden"
    >
      <div id="navWrapper" className="px-2 py-4 w-56 md:w-48 xl:w-56 bg-white md:bg-gray-100 sticky top-12 overflow-y-scroll">
        {session && <SidebarRow avatar={true} image={session.user.image} title={session.user.name} />}
        <SidebarRow Icon={NewspaperIcon} title="Articles" link="/a" />
        <SidebarRow Icon={DocumentTextIcon} title="Posts" link="/p" />
        <SidebarRow Icon={UserGroupIcon} title="Group" link="/group" />
        <SidebarRow Icon={RssIcon} title="Rss" link="/rss" />
      </div>
    </div>
  );

}

export default Sidebar
