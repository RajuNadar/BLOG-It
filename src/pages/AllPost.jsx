import React, { useEffect, useState } from 'react'
import { PostCard } from '../components/index'
import blogServices from '../services/blog'

function AllPost() {
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
    console.log("all post", posts);

    return (
        <div className='p-5 h-[95%] max-w-7xl bg-base-surface my-5 rounded-2xl border-2 border-base-border mx-auto overflow-y-auto [&::-webkit-scrollbar]:hidden space-y-4'>
            <h2 className='text-center text-lg underline font-bold'>All Posts</h2>
            <span className='my-5 text-primary-dark text-md border-b'>There are {posts.length} available posts</span>
            <div className='w-full h-full flex flex-wrap gap-x-8 space-y-8 py-3'>
                {posts.length === 0 ? (
                    <div className='h-full w-full flex items-center justify-center'>
                        <h2 className='text-primary-dark text-2xl font-bold'>There Are No Posts </h2>
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

export default AllPost
