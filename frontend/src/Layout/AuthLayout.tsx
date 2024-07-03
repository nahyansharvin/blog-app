import { Outlet } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import Profile from '../assets/Profile.svg'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { authAtom } from '@/store/authAtom'
import { getUser, signOut } from '@/services/AuthService'
import { handleApiError } from '@/lib/handleApiError'
import { Success } from '@/lib/toast'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const AuthLayout = () => {
    const [authState, setAuthState] = useRecoilState(authAtom)
    const resetAuthState = useResetRecoilState(authAtom)

    const fetchUser = async () => {
        try {
            const response = await getUser()
            setAuthState({
                isAuthenticated: true,
                name: response.name,
                email: response.email
            })
        } catch (error) {
            handleApiError(error)
        }
    }

    const handleLogout = async () => {
        try{
            await signOut()
            Success("Logged out successfully")
            resetAuthState()
            document.location.href = "/"
        } catch (error) {
            handleApiError(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <header className="bg-primary text-primary-foreground py-4 md:px-8 lg:px-12 shadow">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-end gap-1">
                        <img src={Logo} className="h-9" />
                        <a href="#" className="text-2xl font-bold text-[#cbd1e6]">
                            Blogg
                        </a>
                    </div>
                    <nav className="flex items-center space-x-6">
                        <div className="flex items-center gap-2">
                            <img src={Profile} className="h-9" />
                            <div>
                                <p className="text-lg font-semibold leading-3">{authState.name}</p>
                                <p className="text-xs">{authState.email}</p>
                            </div>
                        </div>
                        <div className="top-9">
                            <Button onClick={handleLogout} variant="outline" size="sm" >Logout</Button>
                        </div>
                    </nav>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="bg-muted text-muted-foreground py-4 px-6 md:px-8 lg:px-12 mt-auto">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Blog Website. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default AuthLayout