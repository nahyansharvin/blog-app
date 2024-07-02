import { Outlet } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import Profile from '../assets/Profile.svg'

const AuthLayout = () => {
    return (
        <>
            <header className="bg-primary text-primary-foreground py-4 px-6 md:px-8 lg:px-12 shadow">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-end gap-1">
                        <img src={Logo} className="h-9" />
                        <a href="#" className="text-2xl font-bold text-[#cbd1e6]">
                            Blogg
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center gap-2">
                            <img src={Profile} className="h-9" />
                            <div>
                                <p className="text-lg font-semibold leading-3">John Doe</p>
                                <p className="text-xs">demo@gmail.com</p>
                            </div>
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