import {
  BellIcon,
  MenuIcon,
  SearchIcon,
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
// import Router from "next/router"

function SidebarToggle() {
  document.querySelector(".sidebar").classList.toggle("-translate-x-full");
}

function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center space-x-2 p-2 lg:px-5 shadow-md">
      {/* left */}
      <div className="flex items-center">
        {/* logo */}
        <MenuIcon
          className="h-6 mr-2 md:hidden"
          onClick={() => SidebarToggle()}
        />
        <SearchForm />
        {/* <form onSubmit={() => Router.push("/a")}>
          <div className="flex items-center rounded-full bg-gray-100 p-1">
            <input
              className="w-24 md:w-48 items-center ml-2 bg-transparent outline-none"
              type="text"
              name="kw"
              placeholder="Search"
            />
            <button className="px-2" type="submit"><SearchIcon className="h-5 text-gray-600" /></button>
          </div>
        </form> */}
      </div>

      {/* center */}
      <div className="flex justify-center flex-grow">
        {/* <HeaderIcon active Icon={HomeIcon} />
        <HeaderIcon Icon={NewspaperIcon} />
        <HeaderIcon Icon={ShoppingCartIcon} /> */}
      </div>

      {/* right */}
      <div className="flex items-center space-x-2 justify-end">
        <CreateDd />
        {/* <ViewGridIcon className="circle-icon" /> */}
        <BellIcon className="circle-icon" />
        {/* <ChevronDownIcon className="circle-icon inline-flex md:hidden" /> */}
        <ProfileDd />
      </div>
    </div>
  );
}

export default Header;
