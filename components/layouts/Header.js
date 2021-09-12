import {
  BellIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  PlusIcon,
  NewspaperIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  // ChevronDownIcon,
  // HomeIcon,
  // ShoppingCartIcon,
  // ViewGridIcon,
} from "@heroicons/react/outline"
import ProfileDd from "../Dropdowns/Profile"
import SearchForm from "./SearchForm"
import { SidebarToggle } from "./SidebarToogle"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Dropdown from "../Dropdowns/Dropdown"
import { useRouter } from "next/router"

function Header() {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="sticky top-0 z-50 flex items-center space-x-2 p-2 lg:px-5 shadow-md bg-white dark:bg-gray-900">
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
        <button
          className="p-1 rounded"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme == "dark" ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>
        {/* <CreateDd /> */}
        <Dropdown
          btn={<PlusIcon className="circle-icon" />}
          menu={[
            {
              name: "Article",
              icon: <NewspaperIcon className="h-6 w-6 mr-2" />,
              onClick: () =>
                router.push("/a/create", undefined, { shallow: true }),
            },
            {
              name: "Post",
              icon: <DocumentTextIcon className="h-6 w-6 mr-2" />,
            },
            {
              name: "Question",
              icon: <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />,
            },
          ]}
        />
        <BellIcon className="circle-icon" />
        <ProfileDd />
      </div>
    </div>
  )
}

export default Header
