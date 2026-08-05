import { Link } from "react-router-dom"
import Button from "./Button"

function NotFound() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="w-100 bg-base-surface border-base-border border-4 rounded-2xl py-8 px-5 space-y-3">
                <h1 className="text-primary-dark text-xl font-mono">Oops! This page doesn't exist.</h1>
                <Button className="text-sm"><Link to='/'>Go Back</Link></Button>
            </div>
        </div>
    )
}

export default NotFound
