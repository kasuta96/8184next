import {
  NewspaperIcon,
  RssIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import SidebarRow from "./SidebarRow"
import { navWrapperToggle } from "./SidebarToogle"
import { useRouter } from "next/router"

function Sidebar() {
  const [session, loading] = useSession()
  const router = useRouter()

  return (
    <div
      id="sidebar"
      onClick={navWrapperToggle}
      className="fixed z-40 inset-0 flex-none h-full bg-opacity-25 w-full md:static md:h-auto md:overflow-y-visible md:pt-0 md:w-48 xl:w-56 md:block hidden"
    >
      <div
        id="navWrapper"
        className="px-2 py-4 w-56 md:w-48 xl:w-56 sticky top-12 overflow-y-scroll"
      >
        {session && (
          <SidebarRow
            avatar={true}
            image={session.user.image}
            title={session.user.name}
          />
        )}
        <SidebarRow
          Icon={NewspaperIcon}
          title="Articles"
          onClick={() => router.push("/a")}
        />
        <SidebarRow
          Icon={DocumentTextIcon}
          title="Posts"
          onClick={() => router.push("/p")}
        />
        <SidebarRow
          Icon={UserGroupIcon}
          title="Group"
          onClick={() => router.push("/group")}
        />
        <SidebarRow
          Icon={RssIcon}
          title="Rss"
          onClick={() => router.push("/rss")}
        />
        <SidebarRow
          Icon={ClipboardCheckIcon}
          title="Unpublished"
          onClick={() =>
            router.push({
              pathname: "/a",
              query: {
                published: false,
              },
            })
          }
        />
      </div>
    </div>
  )
}

export default Sidebar
