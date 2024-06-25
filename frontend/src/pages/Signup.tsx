import { Input } from "Components/ui/input"
import { Button } from "Components/ui/button"
import Quote from "../assets/quote.svg"

export default function Component() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1">
                <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
                    <h1 className="mb-2 text-3xl font-bold">Create an account</h1>
                    <p className="mb-6 text-gray-500">
                        Already have an account?{" "}
                        <a href="#" className="text-blue-500">
                            Login
                        </a>
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block mb-1 font-medium">
                                Username
                            </label>
                            <Input id="username" placeholder="Enter your username" />
                        </div>
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