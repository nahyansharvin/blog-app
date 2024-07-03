import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import { Button } from '@/components/ui/button'

const PublicLayout = () => {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen flex flex-col'>
            <header className="bg-primary text-primary-foreground py-4 md:px-8 lg:px-12 shadow">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-end gap-1">
                        <img src={Logo} className="h-9" />
                        <a onClick={() => navigate("/")} className="text-2xl font-bold text-[#cbd1e6]">
                            Blogg
                        </a>
                    </div>
                    <nav className="flex items-center space-x-6">
                        <Button variant="secondary" size="sm" onClick={() => navigate("/signin")} >Sign In</Button>
                    </nav>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className=" bottom-0 w-full bg-muted text-muted-foreground py-4 px-6 md:px-8 lg:px-12 mt-auto">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Blog Website. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default PublicLayout