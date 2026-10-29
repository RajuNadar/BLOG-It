import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../features/authSlice"
import { Input, Button } from "./index"
import authSevice from "../services/auth"

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const session = await authSevice.createAccount(data)
            // console.log("session", session);
            if (session) {
                const userData = await authSevice.getCurrentUser()
                // console.log('userData', userData);
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
        <div className="w-full h-[89vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-base-surface border border-base-border shadow-lg rounded-2xl p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary-text mb-2">
                        Sign-Up To Your Account
                    </h1>
                    {error && (
                        <p className="text-red-600 text-sm mt-3 font-medium">
                            {error}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit(signup)}>
                    <div className="space-y-6">
                        <Input
                            label="Name"
                            placeholder="Enter Your Name"
                            type="text"
                            className="border-2 text-primary-text border-base-border p-2 rounded-xl bg-base-main"
                            {...register("name", {
                                required: true
                            })}
                        />

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
                                        "Email must be a valid address"
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter Your Password"
                            type=""
                            className="border-2 text-primary-text border-base-border p-2 rounded-xl bg-base-main"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <p className="text-primary-muted text-sm text-center">
                            Already Have Account?{" "}
                            <Link
                                to="/log-in"
                                className="text-accent font-semibold hover:underline hover:text-accent-hover">
                                Log-In</Link>
                        </p>

                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp