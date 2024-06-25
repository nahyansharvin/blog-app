import { Input } from "Components/ui/input"
import { Button } from "Components/ui/button"
import Quote from "../assets/quote.svg"

export function Signin() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1">
                <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
                    <h1 className="mb-2 text-3xl font-bold">Login to your account</h1>
                    <p className="mb-6 text-gray-500">
                        Dont have an account?{" "}
                        <a href="#" className="text-blue-500">
                            SignUp
                        </a>
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">
                                Email
                            </label>
                            <Input id="email" placeholder="m@example.com" type="email" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 font-medium">
                                Password
                            </label>
                            <Input id="password" placeholder="Enter your password" type="password" />
                        </div>
                        <Button className="w-full mt-4" variant="default">
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-100">
                <div className="max-w-md p-8 relative">
                    <img src={Quote} alt="Quote" className="w-20 h-20 absolute -left-12 -top-4" />
                    <blockquote className="text-3xl font-semibold">
                    Blogs are whatever we make them. Defining ‘Blog’ is a fool’s errand.
                    </blockquote>
                    <p className="mt-3 text-slate-400 text-lg">- Michael Conniff</p>
                </div>
            </div>
        </div>
    )
}