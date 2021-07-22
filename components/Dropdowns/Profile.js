import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {  } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client'
import Image from 'next/image'

const profile = ['Your Profile', 'Settings']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Profile() {
  const [ session, loading ] = useSession()
  // console.log('session', session);
  if (!session) return (
    <button onClick={() => signIn()}>Sign in</button>
  );

  return (
    <div>
      
    {/* Profile dropdown */}
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Open user menu</span>
              <Image
                className="rounded-full"
                src={session.user.image}
                width="30"
                height="30"
                layout="fixed"
              />
            </Menu.Button>
          </div>
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
              <div className="px-4 py-3 bg-gray-100">
                {session.user.name}
              </div>
              {profile.map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item}
                    </a>
                  )}
                </Menu.Item>
              ))}

              {/* logout */}
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => signOut()}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                    )}
                  >
                    Sign out
                  </div>
                )}

              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>

    </div>
  )
}

export default Profile
