import React, { useEffect, useState } from 'react'
import { Button, PostCard } from '../components/index'
import blogServices from '../services/blog'
import { Link } from 'react-router-dom'

function AllPosts() {
    const [posts, setposts] = useState([])

    useEffect(() => {
        try {
            blogServices.getPost([])
                .then((posts) => {
                    if (posts) {
                        setposts(posts.documents)
                    }
                })

        } catch (error) {
            console.error(error)
        }

    }, [])
    // console.log("all post", posts);

    return (
        <div className='bg-base-surface max-h-[95%] max-w-7xl mx-auto overflow-y-auto [&::-webkit-scrollbar]:hidden p-5 my-5 rounded-2xl border-2 border-base-border space-y-4'>
            <h2 className='text-center text-lg underline font-bold'>All Posts</h2>
            <Button className='block'><Link to='/'>Go Back</Link></Button>
            <span className='my-5 text-primary-dark text-md border-b'>There are {posts.length} available posts</span>
            <div className='w-full h-full flex justify-center flex-wrap gap-x-7 space-y-5 pt-3 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
                {posts.length === 0 ? (
                    <div className='h-full w-screen flex items-center justify-center'>
                        <h2 className='text-primary-dark lg:text-2xl text-md font-bold'>There Are No Posts </h2>
                    </div>
                ) : posts.map((post) => (
                    <div
                        key={post.$id}
                        className='w-55 h-65 rounded-xl bg-base-main border shadow-sm border-base-border'>
                        <PostCard
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllPosts
