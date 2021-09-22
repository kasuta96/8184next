import {
  NewspaperIcon,
  RssIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardCheckIcon,
  ArchiveIcon,
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
      className="fixed z-20 flex-none h-full bg-black bg-opacity-50 w-full md:static md:h-auto md:overflow-y-visible md:w-48 xl:w-56 md:block hidden"
    >
      <div
        id="navWrapper"
        className="px-2 py-4 md:pt-16 w-56 bg-100 md:w-48 xl:w-56 sticky top-0 h-screen overflow-y-scroll"
      >
        {session && <SidebarRow avatar={true} image={session.user.image} title={session.user.name} />}
        <SidebarRow Icon={NewspaperIcon} title={t`Articles`} onClick={() => router.push("/a")} />
        {/* <SidebarRow
          Icon={DocumentTextIcon}
          title={t`Posts`}
          onClick={() => router.push("/p")}
        /> */}
        <SidebarRow Icon={RssIcon} title={t`Japanese news`} onClick={() => router.push("/rss")} />
        <SidebarRow Icon={UserGroupIcon} title={t`Group`} onClick={() => router.push("/p")} />
        <SidebarRow
          Icon={ClipboardCheckIcon}
          title={t`Unpublished`}
          onClick={() =>
            router.push(
              {
                pathname: "/a",
                query: {
                  published: false,
                },
              },
              "a/unpublished"
            )
          }
        />
        {session && (
          <div className="my-1">
            <SidebarRow
              Icon={ArchiveIcon}
              title={t`Draft`}
              onClick={() =>
                router.push(
                  {
                    pathname: "/a",
                    query: {
                      draft: true,
                      user: session.user.id,
                    },
                  },
                  "/a/draft"
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
