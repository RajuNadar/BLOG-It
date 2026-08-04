import { useSelector } from "react-redux"
import { NavLink, useNavigate} from "react-router-dom"
import { LogoutBtn } from "./index"


function Navbar() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  const navLinks = [
    { name: "Home", path: "/", active: true },
    { name: "Log-In", path: "/log-in", active: !authStatus },
    { name: "Sign-Up", path: "/sign-up", active: !authStatus },
    { name: "All Posts", path: "/all-posts", active: authStatus },
    { name: "Add Post", path: "/add-post", active: authStatus },
    {name: "User", path: "/user", active: authStatus},
  ]

  return (
    <header className="w-full text-primary-dark py-3 shadow-md bg-base-surface rounded-b-3xl sticky top-0 z-50">
        <nav className="w-full flex items-center justify-between px-30">
          <div className="mr-4">
            <NavLink to="/">
              <span className="text-2xl text-accent font-bold transition-all hover:text-primary-dark">
                BLOG-It
              </span>
            </NavLink>
          </div>

          <ul className="flex items-center ml-auto space-x-2">
            {navLinks.map((link) =>
              link.active ? (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({isActive}) => isActive ? 'inline-block text-lg px-4 py-2 font-light text-accent ' : 'inline-block text-lg px-4 py-2 duration-200 font-light  hover:text-accent'}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ) : null
            )}
            
            {/* {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )} */}
          </ul>
        </nav>
    </header>
  )
}

export default Navbar
