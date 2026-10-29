import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login, logout } from "./features/authSlice"
import { Outlet } from "react-router-dom"
import authSevice from "./services/auth"
import { Navbar, Footer } from "./components/index"
import { useLocation } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"

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
    <ThemeProvider>
      {!loading
        ? <div className="w-full min-h-screen bg-base-main text-primary-text font-light">
          <Navbar />
          <main className="w-full h-full flex-1 bg-base-main">
            <Outlet />
            {/* value came from react router dom */}
          </main>
          {!hideFooter && <Footer />}
        </div>
        : <div className="bg-base-main w-full min-h-screen flex justify-center items-center">
          <p className="lg:text-4xl text-2xl font-mono underline p-1">Loading...</p>
        </div>
      }
    </ThemeProvider>
  )
}

export default App

