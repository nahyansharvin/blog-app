import { FormEvent, useState } from "react"
import { Input } from "Components/ui/input"
import { Button } from "Components/ui/button"
import { Success } from "@/lib/toast"
import { handleApiError } from "@/lib/handleApiError"
import { signUp } from "@/services/AuthService"
import { authAtom } from "@/store/authAtom"
import Quote from "@/assets/quote.svg"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"


export function Signup() {
    const navigate = useNavigate()
    const [authState, setAuthState] = useRecoilState(authAtom)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signUp({ username, email, password })
            navigate("/")
            Success("Account created successfully")
            setAuthState({
                ...authState,
                isAuthenticated: true
            })
        } catch (error) {
            handleApiError(error)
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1">
                <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
                    <h1 className="mb-2 text-3xl font-bold">Create an account</h1>
                    <p className="mb-6 text-gray-500">
                        Already have an account?{" "}
                        <a onClick={() => navigate("/signin")} className="text-blue-500 cursor-pointer">
                            Login
                        </a>
                    </p>
                    <form className="space-y-4" onSubmit={handleSignup} >
                        <div>
                            <label htmlFor="username" className="block mb-1 font-medium">
                                Username
                            </label>
                            <Input id="username" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">
                                Email
                            </label>
                            <Input id="email" placeholder="m@example.com" type="email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 font-medium">
                                Password
                            </label>
                            <Input id="password" placeholder="Enter your password" type="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <Button className="w-full mt-4" variant="default" type="submit">
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-100">
                <div className="max-w-md p-8 relative">
                    <img src={Quote} alt="Quote" className="w-20 h-20 absolute -left-12 -top-4" />
                    <blockquote className="text-3xl font-semibold">
                        Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.
                    </blockquote>
                    <p className="mt-3 text-slate-400 text-lg">- Brian Clark</p>
                </div>
            </div>
        </div>
    )
}