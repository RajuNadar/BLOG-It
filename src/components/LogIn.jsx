import { useForm } from "react-hook-form"
import { Input, Button } from "./index"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { login } from "../features/authSlice"
import authSevice from "../services/auth"

function LogIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const logIn = async (data) => {
        setError("")
        try {
            const session = await authSevice.logIn(data)
            if (session) {
                const userData = await authSevice.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate("")
                }
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md bg-base-surface border border-base-border shadow-lg rounded-2xl p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary-text mb-2">
                        Log-In To Your Account
                    </h1>

                    {error && (
                        <p className="text-red-600 text-sm mt-3 font-medium">
                            {error}
                        </p>
                    )}
                </div>
                <form onSubmit={handleSubmit(logIn)}>
                    <div className="space-y-6">
                        <Input
                            label="Email"
                            placeholder="Enter Your Email"
                            type="email"
                            className="border-2 text-primary-text border-base-border p-2 rounded-xl bg-base-main"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                        "Email must be a valid address",
                                },
                            })}
                        />

                        <Input
                            label="Password"
                            type=""
                            placeholder="Enter Your Password"
                            className="border-2 text-primary-text border-base-border p-2 rounded-xl bg-base-main"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <p className="text-primary-muted text-sm text-center">
                            Don't Have Any Account?{" "}
                            <Link
                                to="/sign-up"
                                className="text-accent font-semibold hover:underline hover:text-accent-hover">
                                Sign Up</Link>
                        </p>

                        <Button type="submit" className="w-full">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn