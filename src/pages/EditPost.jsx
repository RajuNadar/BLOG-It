import React from 'react'
import blogServices from '../services/blog'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PostForm } from '../components/index'

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    console.log("slug", slug);
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            blogServices.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
            console.log("postttt", post);
        } else {
            navigate("/")
        }
    }, [slug, navigate])
    return post ? (
        <div className='max-w-7xl mx-auto h-full'>
            <PostForm post={post} />
        </div>
    ) : null
}

export default EditPost
