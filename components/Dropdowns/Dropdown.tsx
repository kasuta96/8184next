import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function Dropdown({
  btn,
  header,
  menu,
}: {
  btn?: any
  header?: any
  menu?: Array<{
    icon?: any
    name: string
    onClick?: any
  }>
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center">
        {btn ? (
          btn
        ) : (
          <div className="inline-flex justify-center w-full p-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-max mt-2 origin-top-right bg-white text-gray-800 dark:bg-black dark:text-gray-100 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
          {header && header}
          <div className="p-1">
            {menu ? (
              menu.map((item, i) => {
                return (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <button
                        className={`${
                          active && "bg-blue-500 text-white"
                        } group flex rounded-md items-center w-full p-2 text-sm`}
                        onClick={item.onClick}
                      >
                        {item.icon && <div className="mr-2">{item.icon}</div>}
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                )
              })
            ) : (
              <div className="text-gray-400 p-2">Empty option</div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
