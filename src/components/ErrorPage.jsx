import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

function ErrorPage({ error }) {
    console.error(error)
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="w-100 bg-base-surface border-base-border border-4 rounded-2xl py-8 px-5 space-y-3">
                <h1 className="text-primary-dark text-xl font-mono">Something went wrong.</h1>
                <Button className="text-xs"><Link to='/'>Go Back</Link></Button>
                <p>ERROR::{error}</p>
            </div>
        </div>
    )
}

export default ErrorPage
