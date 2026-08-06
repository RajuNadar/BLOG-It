import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login, logout } from "./features/authSlice"
import { Outlet } from "react-router-dom"
import authSevice from "./services/auth"
import { Navbar, Footer } from "./components/index"
import { useLocation } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const hideFooter =
  location.pathname.startsWith('/add-post') ||
  location.pathname.startsWith('/edit-post') ||
  location.pathname.startsWith('/user') ||
  location.pathname.startsWith('/sign-up') ||
  location.pathname.startsWith('/log-in');

  useEffect(() => {
    const findUser = async () => {
      setLoading(true)
      try {
        const userData = await authSevice.getCurrentUser()
        if (userData) {
          dispatch(login({
            userData: {
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
              $createdAt: userData.$createdAt,
              accessedAt: userData.accessedAt,
              $updatedAt: userData.$updatedAt,
              status: userData.status,
              prefs: userData.prefs,
              phoneVerification: userData.phoneVerification,
              phone: userData.phone,
            }
          }))
        } else {
          dispatch(logout())
        }
        // console.log("userrrr", userData);
        // console.log(JSON.stringify(userData));
        // console.dir("dir", userData);
        // console.log(Object.keys(userData));
        // console.log(userData.toString);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    findUser()
  }, [])

  return (
    !loading
      ? <div className="w-full h-screen bg-[#FFFFFF] font-light">
        <Navbar />
        <main className="h-full">
          <Outlet />
          {/* value came from react router dom */}
        </main>
        {!hideFooter && <Footer /> }
      </div>
      : <div className="bg-[#FFFFFF] h-full flex justify-center items-center">
        <p className="lg:text-4xl text-2xl font-mono underline p-1">Loading...</p>
      </div>
  )
}

export default App

