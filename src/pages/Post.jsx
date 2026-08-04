import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import blogServices from '../services/blog'
import uploadServices from '../services/upload'
import { Button } from '../components'
import parse from "html-react-parser"

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const isAuther = post && userData ? post.userId === userData.$id : false
    console.log("userDAta", userData);

    useEffect(() => {
        if (slug) {
            blogServices.getPost(slug)
                .then((post) => {
                    if (post) setPost(post)
                    else navigate("/")
                })
        } else navigate("/")
    }, [slug, navigate])

    // console.log("poooost", post.featuredImage);

    const deletePost = () => {
        blogServices.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    uploadServices.deleteFile(post.featuredImage)
                    navigate("/all-posts")
                }
            })
    }
    return post ? (
        <div className='max-w-7xl h-[85%] overflow-y-auto mx-auto border border-base-border p-5 my-5 bg-base-surface rounded-2xl'>
            <div className='flex justify-between items-center mb-5'>
                <Button className='w-25'><Link to={'/all-posts'}>Go Back</Link></Button>
                {isAuther && (
                    <div className='flex justify-center gap-5'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className='w-20'>Edit</Button>
                        </Link>
                        <Button className='w-20 bg-red-500 hover:bg-red-400' onClick={deletePost}>Delete</Button>
                    </div>
                )}
            </div>
            <div className='flex flex-col h-'>
                <div className='flex flex-col gap-3 items-center justify-center'>
                    {post?.featuredImage && (
                        <img
                            src={uploadServices.getFilePreview(post.featuredImage)}
                            alt={post?.title}
                            className='w-[30%] rounded-lg border'
                        />
                    )}
                    <div>
                        <h1 className='text-primary-dark text-lg font-semibold underline'>{post.title}</h1>
                    </div>
                </div>
                <div className='bg-base-main p-3 rounded-2xl mt-5 text-primary-muted'>
                    <div>
                        {parse(post.content)}
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default Post
