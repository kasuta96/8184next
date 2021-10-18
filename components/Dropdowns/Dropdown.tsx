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
      <Menu.Button aria-label="Menu" className="flex items-center outline-none">
        {btn ? (
          btn
        ) : (
          <div className="circle-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
        <Menu.Items className="absolute right-0 w-max max-w-sm mt-2 origin-top-right bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 divide-y divide-gray-200 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none z-30">
          {header && header}
          {menu && (
            <div className="p-3">
              {menu.map((item, i) => {
                return (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "bg-200"
                        } group flex items-center w-full py-2 px-4 rounded-md cursor-pointer`}
                        onClick={item.onClick}
                      >
                        {item.icon && <div className="mr-2">{item.icon}</div>}
                        {item.name}
                      </div>
                    )}
                  </Menu.Item>
                )
              })}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
