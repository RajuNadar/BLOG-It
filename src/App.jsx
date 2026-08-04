import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login, logout } from "./features/authSlice"
import { Outlet } from "react-router-dom"
import authSevice from "./services/auth"
import { Navbar, Footer } from "./components/index"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authSevice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    !loading
    ? <div className="w-full bg-[#FFFFFF] h-screen font-light">
        <Navbar />
        <main className="h-full">
          <Outlet />
           {/* value came from react router dom */}
        </main>
        <Footer />
    </div>
    : <div className="bg-[#FFFFFF] min-h-screen flex justify-center items-center">
      <p className="text-4xl font-mono underline p-1">Loading...</p>
    </div>
  )
}

export default App

