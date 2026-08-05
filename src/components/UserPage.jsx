import { useSelector, useDispatch } from "react-redux"
import authSevice from "../services/auth";
import LogoutBtn from "./LogoutBtn";
import { useEffect, useState } from "react";
import { login } from "../features/authSlice";
import { Link } from "react-router-dom";
import Button from "./Button";
import blogServices from "../services/blog";
import { Query } from "appwrite";
import PostCard from "./PostCard";

function UserPage() {
  const userData = useSelector((state) => state?.auth.userData)
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch()
  const [userDataLoading, setUserDataLoading] = useState(!userData)
  // console.log("user data", userData?.$id);

  useEffect(() => {
    if (userData) return;

    const fetchUser = async () => {
      try {
        setUserDataLoading(true)
        const user = await authSevice.getCurrentUser()
        if (user) {
          dispatch(login({ userData: user }))
        }
      } catch (error) {
        console.error("Failed to fetch user on first visit:", error);
      } finally {
        setUserDataLoading(false)
      }
    }
    fetchUser()
  }, [userData, dispatch])

  useEffect(() => {
    if (!userData?.$id) return;
    const fetchUserPost = async () => {
      try {
      const userPosts = await blogServices.listPost([Query.equal('userId', userData.$id)])
      if (userPosts) {
        setPosts(userPosts.documents)
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
    }
    fetchUserPost()
  }, [userData])

  console.log("all post in userPage", posts);

  if (userDataLoading) {
    return (
      <div className="max-w-5xl mx-auto my-5 p-5 text-center text-gray-500 animate-pulse">
        Fetching your profile details...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-5xl mx-auto my-5 p-5 text-center text-red-500">
        No user session found. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className='max-w-5xl shadow-sm mx-auto bg-base-surface border-2 border-base-border rounded-2xl p-6 my-5'>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-dark mb-1">Your Information</h1>
          <LogoutBtn />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-lg">Name: <span className="text-primary-text font-semibold">{userData.name}</span></p>
            <p className="font-mono text-md">Uploaded <span className="text-primary-text text-md font-bold">{posts.length}</span> posts</p>
            <p className="font-mono text-sm">Your email: <span className="text-primary-text font-bold">{userData.email}</span></p>
            <p className="font-mono text-sm">Account Created At: <span className="text-primary-text font-bold">{new Date(userData.$createdAt).toLocaleDateString()}</span></p>
          </div>
          <div>
            <Button className="text-sm mr-2"><Link to='/all-posts'>See All Posts</Link></Button>
            <Button className="text-sm"><Link to='/add-post'>Add Post</Link></Button>
          </div>
        </div>
      </div>


      <div className="bg-base-surface w-5xl h-[70%] mx-auto overflow-y-auto [&::-webkit-scrollbar]:hidden border border-base-border rounded-2xl p-6">
        <h2 className="text-center font-mono text-lg">Your Posts</h2>
        <div className="w-full h-full flex flex-wrap gap-x-7 space-y-5 pt-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {posts.length === 0 ? (
            <div className='h-full w-full flex items-center justify-center'>
              <h2 className='text-primary-dark text-xl font-semibold'>You haven't posted anything yet.</h2>
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
    </div>
  )
}

export default UserPage
