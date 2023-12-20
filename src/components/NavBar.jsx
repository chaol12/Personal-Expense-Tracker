import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useLocation } from 'react-router-dom';

function MobileNavLink({ to, children, testid }) {
  return (
    <Popover.Button as={NavLink} to={to} className="block w-full p-2" data-testid= {testid}>
      {children}
    </Popover.Button>
  )
}
function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={
          'origin-center transition' + 
          (open && 'scale-90 opacity-0')
        }
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={
          'origin-center transition' + 
          (!open && 'scale-90 opacity-0')}
      />
    </svg>
  )
}

function MobileNavigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
        await logout();
        navigate("/");
    } catch (err) {
        console.error("Error logging out:", err);
    }
};
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
        testid="toggle-button"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {!currentUser ? 
            (<Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
            >
              <MobileNavLink to="/register" testid="signup-m" >Sign Up</MobileNavLink>
              <hr className="m-2 border-slate-300/40" />
              <MobileNavLink to="/login" testid="signin-m">Sign In</MobileNavLink>
            </Popover.Panel>)
              :
            (<Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
            >
              <MobileNavLink to="/transtable">Dashboard</MobileNavLink>
              <MobileNavLink to="/data">Data</MobileNavLink>
              <MobileNavLink to="/profile">Profile</MobileNavLink>
              <hr className="m-2 border-slate-300/40" />
              <button className="block w-full p-2" data-testid="logout-m" onClick={handleLogout}>Log out</button>
            </Popover.Panel>)
          }
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

const NavBar = () => {
    const location = useLocation();
    const [bgColor, setBgColor] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
          await logout();
          navigate("/");
      } catch (err) {
          console.error("Error logging out:", err);
      }
  };
  useEffect(() => {
    if(location.pathname == '/') setBgColor(" bg-[#D3F6DB]")
    else setBgColor(" bg-transparent")
  }, [location])
  return(
    <header className={"py-5" + bgColor}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className = "flex items-center md:gap-x-12">
            <NavLink to="/" data-testid="home" className="text-2xl font-semibold whitespace-nowrap">Wise Wallet</NavLink>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
              {!currentUser ? (
              <div className="hidden md:flex md:gap-x-6">
                <NavLink to="/login" data-testid="signin">Sign In</NavLink>
                <NavLink to="/register" data-testid="signup">Sign Up</NavLink>
              </div>) :
              (
              <div className="hidden md:flex md:gap-x-6">
                <NavLink to="/transtable" data-testid="dashboard">Dashboard</NavLink>
                <NavLink to="/data"data-testid="data">Data</NavLink>
                <NavLink to="/profile" data-testid="profile">Profile</NavLink>
                <button onClick={handleLogout} data-testid="logout">Log Out</button>
              </div>
              )}
              <div className="-mr-1 md:hidden" data-testid="mobilNavigation">
                <MobileNavigation />
              </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
