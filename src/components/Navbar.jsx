import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { Button, LogoutBtn, ThemeToggleBtn } from "./index"
import { useState } from "react"
import authSevice from "../services/auth"
import { logout } from "../features/authSlice"


function Navbar() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const logoutHandler = () => {
    authSevice.logOut()
      .then(() => dispatch(logout()))
  }

  const navLinks = [
    { name: "Home", path: "/", active: true },
    { name: "Log-In", path: "/log-in", active: !authStatus },
    { name: "Sign-Up", path: "/sign-up", active: !authStatus },
    { name: "All Posts", path: "/all-posts", active: authStatus },
    { name: "Add Post", path: "/add-post", active: authStatus },
    { name: "User", path: "/user", active: authStatus },
    // {name: LogoutBtn, path: '/', active: authStatus},
  ]

  return (
    <header className="w-full px-10 lg:px-30 py-3 shadow-md bg-base-surface border border-base-border sticky top-0 z-50">
      <nav className="flex items-center justify-between py-2">
        <NavLink to="/">
          <span className="text-2xl font-bold text-accent">
            BLOG-It
          </span>
        </NavLink>

        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map(
            (link) =>
              link.active && (
                <li key={link.name} className="relative">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => isActive ? 'inline-block text-lg font-light text-accent underline underline-offset-4' : 'inline-block text-lg duration-200 font-light hover:text-accent'}
                  >
                    {link.name}
                  </NavLink>
                </li>
              )
            )}
            <ThemeToggleBtn />
        </ul>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden text-2xl"
        >
          ☰
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
      fixed
      top-0
      right-0
      h-full
      w-64
      bg-base-surface
      shadow-xl
      transform
      transition-transform
      duration-300
      lg:hidden
      ${isOpen ? "translate-x-0" : "translate-x-full"}
    `}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-2 px-6">
          {navLinks.map(
            (link) =>
              link.active && (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => isActive ? 'inline-block text-lg px-4 py-2 font-light text-accent ' : 'inline-block text-lg px-4 py-2 duration-200 font-light hover:text-accent'}
                  >
                    {link.name}
                  </NavLink>
                </li>
              )
            )}
            <ThemeToggleBtn className=""/>
          {authStatus && <li onClick={logoutHandler} className="font-mono text-md lg:px-3 py-1 px-2 lg:py-2 duration-300 bg-red-100 hover:bg-red-200 rounded-full  text-red-600 text-center">Logout</li>}
          
        </ul>
      </div>
    </header>
  )
}

export default Navbar