import {
  NewspaperIcon,
  RssIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardCheckIcon,
  TranslateIcon,
  PencilAltIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import SidebarRow from "./SidebarRow"
import { navWrapperToggle } from "./SidebarToogle"
import { useRouter } from "next/router"
import useTrans from "../../hooks/useTrans"

function Sidebar() {
  const { t, lang } = useTrans("layouts")
  const [session, loading] = useSession()
  const router = useRouter()

  return (
    <div
      id="sidebar"
      onClick={navWrapperToggle}
      className="fixed lg:static z-20 flex-none h-full bg-black bg-opacity-50 w-full md:h-auto md:overflow-y-visible lg:w-56 lg:block hidden"
    >
      <div id="navWrapper" className="px-2 py-4 md:pt-16 w-56 bg-100 sticky top-0 h-screen overflow-y-scroll">
        {session && <SidebarRow avatar={true} image={session.user.image} title={session.user.name} />}
        <SidebarRow
          Icon={DocumentTextIcon}
          title={t`Blog`}
          onClick={() =>
            router.push({
              pathname: "/a",
              query: {
                category: 2, // Category "Blog"
              },
            })
          }
          active={router.pathname == "/a" && router.query?.category == "2"}
        />
        <SidebarRow
          Icon={TranslateIcon}
          title={t`Translated news`}
          onClick={() =>
            router.push({
              pathname: "/a",
              query: {
                category: 1, // Category "Blog"
              },
            })
          }
          active={router.pathname == "/a" && router.query?.category == "1"}
        />
        {/* <SidebarRow
          Icon={DocumentTextIcon}
          title={t`Posts`}
          onClick={() => router.push("/p")}
        /> */}
        <SidebarRow
          Icon={RssIcon}
          title={t`News source`}
          onClick={() => router.push("/rss")}
          active={router.pathname == "/rss"}
        />
        <SidebarRow
          Icon={UserGroupIcon}
          title={t`Group`}
          onClick={() => router.push("/p")}
          active={router.pathname == "/p"}
        />
        <SidebarRow
          Icon={ClipboardCheckIcon}
          title={t`Unpublished`}
          onClick={() =>
            router.push({
              pathname: "/a",
              query: {
                published: false,
              },
            })
          }
          active={router.pathname == "/a" && router.query?.published === "false"}
        />
        {session && <div className="my-2">{/* User sidebar */}</div>}
      </div>
    </div>
  )
}

export default Sidebar
