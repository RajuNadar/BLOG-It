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
    className="inline-block font-mono text-md px-3 py-2 duration-300 bg-red-100 hover:bg-red-200 rounded-full  text-red-600 "
  >Logout</NavLink>
}

export default LogoutBtn
