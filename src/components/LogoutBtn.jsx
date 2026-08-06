import authSevice from "../services/auth"
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice"
import { NavLink } from "react-router-dom"

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authSevice.logOut()
      .then(() => dispatch(logout()))
  }
  return <NavLink
  to={'/'}
    onClick={logoutHandler}
    className="hidden lg:block font-mono text-md lg:px-3 py-1 px-2 lg:py-2 duration-300 bg-red-100 hover:bg-red-200 rounded-full  text-red-600 text-center"
  >Logout</NavLink>
}

export default LogoutBtn
