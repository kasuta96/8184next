import {
  BellIcon,
  MenuIcon,
  PlusIcon,
  NewspaperIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  // ChevronDownIcon,
  // HomeIcon,
  // ShoppingCartIcon,
  // ViewGridIcon,
} from "@heroicons/react/outline"
import SearchForm from "./SearchForm"
import { SidebarToggle } from "./SidebarToogle"
import Dropdown from "../Dropdowns/Dropdown"
import { useRouter } from "next/router"
import { signIn, signOut, useSession } from "next-auth/client"
import Avatar from "../Image/Avatar"
import QuickSetting from "./QuickSetting"
import useTrans from "../../hooks/useTrans"

function Header() {
  const router = useRouter()
  const [session, loading] = useSession()
  const { t, lang } = useTrans("layouts")

  return (
    <div className="py-6">
      <div className="fixed top-0 inset-x-0 z-30 flex items-center space-x-2 p-2 lg:px-5 bg-50 shadow">
        {/* left */}
        <div className="flex items-center">
          {/* logo */}
          <MenuIcon className="h-6 mr-2 md:hidden" onClick={SidebarToggle} />
          <SearchForm />
        </div>

        {/* center */}
        <div className="flex justify-center flex-grow">
          {/* <HeaderIcon active Icon={HomeIcon} />
        <HeaderIcon Icon={NewspaperIcon} />
        <HeaderIcon Icon={ShoppingCartIcon} /> */}
        </div>

        {/* right */}
        <div className="flex items-center space-x-2 justify-end">
          <QuickSetting className="hidden sm:flex items-center" />

          <Dropdown
            btn={<PlusIcon className="circle-icon" />}
            header={<div className="px-4 py-2 text-600 font-medium text-center">{t`Create`}</div>}
            menu={[
              {
                name: t`Article`,
                icon: <NewspaperIcon className="h-6 w-6 mr-2" />,
                onClick: () => router.push("/a/create", undefined, { shallow: true }),
              },
              {
                name: t`Post`,
                icon: <DocumentTextIcon className="h-6 w-6 mr-2" />,
              },
              {
                name: t`Question`,
                icon: <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />,
              },
            ]}
          />
          {/* <BellIcon className="circle-icon" /> */}
          {!session ? (
            <button onClick={() => signIn()}>{t`Sign in`}</button>
          ) : (
            <Dropdown
              btn={<Avatar image={session?.user?.image} size={30} />}
              header={
                <>
                  <div className="px-4 py-3">{session?.user?.name}</div>
                  <QuickSetting className="flex items-center sm:hidden text-center justify-center" />
                </>
              }
              menu={[
                {
                  name: t`Your profile`,
                },
                {
                  name: t`Setting`,
                },
                {
                  name: t`Sign out`,
                  onClick: () => signOut(),
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
