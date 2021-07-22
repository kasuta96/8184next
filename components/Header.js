import {
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  NewspaperIcon,
  SearchIcon,
  ShoppingCartIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./layouts/HeaderIcon";
import ProfileDd from "./Dropdowns/Profile";

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
        <div className="flex items-center rounded-full bg-gray-100 p-1">
          <SearchIcon className="h-5 text-gray-600" />
          <input
            className="w-24 md:w-48 items-center mx-2 bg-transparent outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* center */}
      <div className="flex justify-center flex-grow">
        <HeaderIcon active Icon={HomeIcon} />
        <HeaderIcon Icon={NewspaperIcon} />
        <HeaderIcon Icon={ShoppingCartIcon} />
      </div>

      {/* right */}
      <div className="flex items-center space-x-2 justify-end">
        {/* <ViewGridIcon className="icon" /> */}
        <BellIcon className="icon" />
        {/* <ChevronDownIcon className="icon inline-flex md:hidden" /> */}
        <ProfileDd />
      </div>
    </div>
  );
}

export default Header;
