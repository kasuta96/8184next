import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PlusIcon, NewspaperIcon, DocumentTextIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

const creates = [
  {
    name: "Article",
    link: "/a/create",
    icon: NewspaperIcon
  },
  {
    name: "Post",
    link: "#",
    icon: DocumentTextIcon
  },
  {
    name: "Question",
    link: "#",
    icon: QuestionMarkCircleIcon
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Create() {

  const router = useRouter()

  return (
    <div >
      
    {/* Create dropdown */}
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button className="max-w-xs flex items-center">
              <span className="sr-only">Create</span>
              <PlusIcon className="circle-icon" />
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >

              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {creates.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <button
                        onClick={() => router.push(item.link)}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex px-4 py-2 text-sm text-gray-700 cursor-pointer'
                        )}
                      >
                        {item.icon && <item.icon className="h-6 w-6 mr-2" />}
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}

              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

    </div>
  )
}

export default Create
