import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Home, Signup, Login, EditPost, Post, AllPost, AddPost, User } from './pages/index.js'
import { NotFound, ErrorPage , Protected } from './components/index.js'
import store from "./store/store.js"
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: '/log-in', element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: '/sign-up', element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: '/all-posts', element: (
          <Protected authentication>
            {""}
            <AllPost />
          </Protected>
        )
      },
      {
        path: '/add-post', element: (
          <Protected authentication>
            {""}
            <AddPost />
          </Protected>
        )
      },
      {
        path: '/edit-post/:slug', element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        )
      },
      {
        path: '/user', element:
          <Protected>
            <User />
          </Protected>
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
