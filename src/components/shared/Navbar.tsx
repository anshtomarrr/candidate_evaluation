"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import NotificationCenter from "@/components/ui/NotificationCenter";
import { useNotifications } from "@/hooks/useNotifications";
import { Menu, Transition } from "@headlessui/react";

// Mock auth state for development
const MOCK_AUTH = {
  isAuthenticated: true,
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { notifications, markAsRead, markAllAsRead, clearNotification } =
    useNotifications();

  // In a real app, this would come from an auth context
  const { isAuthenticated, user } = MOCK_AUTH;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold text-blue-600 flex items-center"
              >
                <span className="bg-blue-600 text-white p-1 rounded-md mr-2">
                  JM
                </span>
                JobMatch
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                href="/jobs"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-gray-700 transition-colors duration-200"
              >
                Browse Jobs
              </Link>
              <Link
                href="/companies"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-gray-700 transition-colors duration-200"
              >
                Companies
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-gray-700 transition-colors duration-200"
              >
                Resources
              </Link>
              <Link
                href="/resume-ranking"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-gray-700 transition-colors duration-200"
              >
                Resume Ranking
                <span className="ml-1 text-[10px] text-blue-600 font-bold leading-none">
                  NEW
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <NotificationCenter
                  notifications={notifications}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                  onClearNotification={clearNotification}
                />

                {/* User dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <span className="sr-only">Open user menu</span>
                      {user.avatar ? (
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <div className="flex items-center">
                          <UserCircleIcon className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-gray-700">
                            {user.name}
                          </span>
                          <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" />
                        </div>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile/applications"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Applications
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/notifications"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Notifications
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/settings"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link href="/auth/register" className="ml-3 btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg animate-slide-down">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              href="/jobs"
              className="block py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-gray-800 transition-colors duration-200"
            >
              Browse Jobs
            </Link>
            <Link
              href="/companies"
              className="block py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-gray-800 transition-colors duration-200"
            >
              Companies
            </Link>
            <Link
              href="/resources"
              className="block py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-gray-800 transition-colors duration-200"
            >
              Resources
            </Link>
            <Link
              href="/resume-ranking"
              className="block py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-gray-800 transition-colors duration-200"
            >
              Resume Ranking
              <span className="ml-1 text-[10px] text-blue-600 font-bold leading-none">
                NEW
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {user.avatar ? (
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <UserCircleIcon className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/profile"
                      className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/profile/applications"
                      className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Applications
                    </Link>
                    <Link
                      href="/notifications"
                      className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Notifications
                    </Link>
                    <Link
                      href="/settings"
                      className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      Settings
                    </Link>
                    <button className="block w-full text-left py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200">
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link
                  href="/auth/login"
                  className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="block py-2 mt-1 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
