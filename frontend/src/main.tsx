import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

import { HomePage, Signup, Signin, BlogView, ErrorPage, CreateBlog } from 'Pages/index'
import AuthLayout from './Layout/AuthLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/blog/:id',
        element: <BlogView />,
      },
      {
        path: "/write",
        element: <CreateBlog />
      }

    ]
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
)
