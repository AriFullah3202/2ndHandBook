
import React, { useContext, useState } from 'react'
import { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Disclosure, Menu } from '@headlessui/react'
import { FaBars } from "react-icons/fa";
import { AuthContext } from '../context/AuthProvider';



const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)

  const handleLogOut = () => {
    logOut()
      .then((res) => {
      })
      .catch(error => console.error(error))
  }




  const menuitem = [];
  if (user) {
    menuitem.push({ to: '/home', data: 'Home' },
      { to: "/blog", data: "Blog" }, { to: '/deshboard', data: "Deshboard" })
  } else {
    menuitem.push({ to: '/home', data: 'Home' }, { to: "/blog", data: "Blog" })
  }
  return (

    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (

        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaBars className="block h-4 w-4" aria-hidden="true" />
                  ) : (
                      <FaBars className="block h-4 w-4" aria-hidden="true" />
                    )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {
                      menuitem.map((nav, index) => {

                        return <NavLink key={index}
                          to={`${nav.to}`}

                          aria-label='Home'
                          title='Home'
                          className={({ isActive }) =>
                            isActive
                              ? 'font-medium tracking-wide text-red-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                              : 'font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                          } >
                          {nav.data}
                        </NavLink>
                      })
                    }
                    {
                      user ?.uid ?
                        <>
                          <Link onClick={handleLogOut}>Logout</Link>
                        </>
                        :
                        <Link to="/login">Login</Link>
                        }

                  </div>
                </div>
                <h1 className="mx-10 pr-14 md:mx-auto lg:mx-auto text-2xl">2ndHandBook</h1>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                    </Menu.Button>
                    {
                      user ?.uid ?
                        <div className="flex justify-center items-center gap-1">

                          {/* <img
                            className="h-4 w-4 rounded-full"
                            src={user ?.photoURL}

                          /> */}
                          <label htmlFor="deshboardDrawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                            <FaBars className="block h-4 w-4" aria-hidden="true" />

                          </label>
                        </div>
                        :
                        <div className="flex justify-center items-center gap-3">
                          <Link to="/login">Login</Link>
                        </div>
                      }
                  </div>

                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col text-center">
              {
                menuitem.map((nav, index) => {

                  return <NavLink key={index}
                    to={`${nav.to}`}

                    aria-label='Home'
                    title='Home'
                    className={({ isActive }) =>
                      isActive
                        ? 'font-medium tracking-wide text-red-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                        : 'font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                    } >
                    {nav.data}
                  </NavLink>
                })

              }
              {
                user ?.uid ?
                  <>
                    <Link onClick={handleLogOut}>Logout</Link>
                  </>
                  :
                  <Link to="/login">Login</Link>
                  
                  
                                     }


            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

  )

}


export default Navbar