import { RssIcon, UserGroupIcon, DocumentTextIcon, ClipboardCheckIcon, TranslateIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import { navWrapperToggle } from "./SidebarToogle"
import { useRouter } from "next/router"
import useTrans from "../../hooks/useTrans"
import Avatar from "../Image/Avatar"
import Link from "next/link"

const SidebarLink = () => {
  const { t } = useTrans("layouts")
  const [session] = useSession()
  const router = useRouter()

  const Row: React.FC<{ url: string; title: string; active: boolean; Icon?: any }> = ({ url, title, active, Icon }) => {
    return (
      <Link href={url}>
        <a className={`flex items-center p-2 space-x-2 hover:bg-200 rounded-md cursor-pointer ${active && "bg-300"}`}>
          <Icon className="h-6 w-6" />
          <p className="">{title}</p>
        </a>
      </Link>
    )
  }

  return (
    <div
      id="sidebar"
      onClick={navWrapperToggle}
      className="fixed lg:static z-20 flex-none h-full bg-black bg-opacity-50 w-full md:h-auto md:overflow-y-visible lg:w-56 lg:block hidden"
    >
      <div id="navWrapper" className="px-2 py-4 md:pt-16 w-56 bg-100 sticky top-0 h-screen overflow-y-scroll">
        {session && (
          <div className="flex items-center p-2 space-x-2 hover:bg-200 rounded-md cursor-pointer">
            <Avatar image={session.user.image} size={30} />
            <p className="">{session.user.name}</p>
          </div>
        )}

        <Row
          Icon={DocumentTextIcon}
          title={t`Blog`}
          url="/a?category=2"
          active={router.pathname == "/a" && router.query?.category == "2"}
        />

        <Row
          Icon={TranslateIcon}
          title={t`Translated news`}
          url="/a?category=1"
          active={router.pathname == "/a" && router.query?.category == "1"}
        />
        <Row Icon={RssIcon} title={t`News source`} url="/rss" active={router.pathname == "/rss"} />
        <Row Icon={UserGroupIcon} title={t`Group`} url="/p" active={router.pathname == "/p"} />
        <Row
          Icon={ClipboardCheckIcon}
          title={t`Unpublished`}
          url="/a?published=false"
          active={router.pathname == "/a" && router.query?.published === "false"}
        />
        {session && <div className="my-2">{/* User sidebar */}</div>}
      </div>
    </div>
  )
}

export default SidebarLink
