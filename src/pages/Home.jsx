import { useState, useEffect } from 'react'
import { Button, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Home() {
    const userStatus = useSelector((state) => state.auth.status)
    // console.log("user status", userStatus);

    return (
        <div className="w-full h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-xl mx-auto bg-base-surface shadow-lg rounded-3xl p-10 text-center border border-base-border">
                <div className="mb-6">
                    <span className="inline-block px-6 py-2 rounded-3xl bg-base-main text-primary-text font-bold text-lg border border-base-border">
                        Welcome
                    </span>
                </div>
                <h1 className="text-primary-muted text-md font-semibold mb-6">
                    {userStatus ? 'Dive into global conversations, share your voice, and learn something new today. Discover blogs, ideas, and stories shared by our community.' : 'Discover blogs, ideas, and stories shared by our community. Please login to continue reading and explore the latest content.'}
                </h1>
                {userStatus
                    ? <NavLink to={"/all-posts"}>
                        <Button className='min-1/2 px-5 py-2'>Go to posts section</Button>
                    </NavLink>

                    : <span className="text-xl font-bold text-primary-text mb-4">
                        To Read Posts <NavLink className="text-accent hover:underline hover:text-accent-hover" to='/log-in'>Login</NavLink>
                    </span>}
            </div>
        </div>
    )
}

export default Home