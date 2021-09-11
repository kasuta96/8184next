import {
  BellIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  // ChevronDownIcon,
  // HomeIcon,
  // NewspaperIcon,
  // ShoppingCartIcon,
  // ViewGridIcon,
} from "@heroicons/react/outline"
// import HeaderIcon from "./HeaderIcon"
import ProfileDd from "../Dropdowns/Profile"
import CreateDd from "../Dropdowns/Create"
import SearchForm from "./SearchForm"
import { SidebarToggle } from "./SidebarToogle"
// import Router from "next/router"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

function Header() {
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
        <CreateDd />
        {/* <ViewGridIcon className="circle-icon" /> */}
        <BellIcon className="circle-icon" />
        {/* <ChevronDownIcon className="circle-icon inline-flex md:hidden" /> */}
        <ProfileDd />
      </div>
    </div>
  )
}

export default Header
