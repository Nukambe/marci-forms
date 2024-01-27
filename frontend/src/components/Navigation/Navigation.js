import { Fragment, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useContext(SessionContext);
  const [links, setLinks] = useState([
    {
      title: "Forms",
      href: "/",
      active: pathname === "/" || pathname.includes("/forms"),
    },
  ]);

  useEffect(() => {
    if (user?.role === "admin") {
      setLinks([
        {
          title: "Forms",
          href: "/",
          active:
            (pathname === "/" || pathname.includes("/forms")) &&
            !pathname.includes("/dashboard"),
        },
        {
          title: "Dashboard",
          href: "/dashboard",
          active: pathname.includes("/dashboard"),
        },
      ]);
    }
  }, [user, pathname]);

  return (
    <Disclosure
      as="nav"
      className="bg-green-200 shadow-md z-50 absolute w-full"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center text-2xl font-bold text-green-900">
                  Marci Forms
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className={classNames(
                        link.active
                          ? " border-green-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                      )}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="w-10 bg-green-200 text-green-900" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <>
                            <div className="px-4 py-2 text-sm">
                              Hello, {user?.firstName}!
                            </div>
                            <button
                              onClick={() => dispatch(logout())}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              Sign out
                            </button>
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {links.map((link, index) => (
                <Disclosure.Button
                  key={index}
                  as={Link}
                  to={link.href}
                  className={classNames(
                    pathname === link.href
                      ? "border-green-500 bg-green-50  text-green-700"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                  )}
                >
                  {link.title}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
