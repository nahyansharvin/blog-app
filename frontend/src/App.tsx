import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage, Signup, Signin, BlogView, ErrorPage, CreateBlog } from 'Pages/index'
import AuthLayout from '@/Layout/AuthLayout'
import PublicLayout from '@/Layout/PublicLayout'
import { authAtom } from '@/store/authAtom'
import { useRecoilValue } from 'recoil'
import { PublicErrorPage } from './pages/PublicErrorPage'

const authRouter = createBrowserRouter([
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
    }
])

const unAuthRouter = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/blog/*',
                element: <PublicErrorPage />,
            }
        ]
    },
    {
        path: '/signin',
        element: <Signin />,
    },
    {
        path: '/signup',
        element: <Signup />,
    }
])

function App() {
    const { isAuthenticated } = useRecoilValue(authAtom)
    return <RouterProvider router={isAuthenticated ? authRouter : unAuthRouter} />
}

export default App