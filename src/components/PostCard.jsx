import uploadServices from '../services/upload'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-full bg-post-card border border-base-border rounded-xl py-3 px-2 space-y-2 hover:scale-95 transition-all'>
                {featuredImage && (
                    <div className='h-[50%]'>
                        <img
                            src={uploadServices.getFilePreview(featuredImage)}
                            alt={title}
                            className='w-full h-full border-3 border-base-border rounded-md object-cover object-top'
                        />
                    </div>
                )}
                <div className="group w-full h-1/2 border border-base-border rounded-2xl p-1 overflow-hidden ">
                    <div className=" transition-transform duration-[2000ms] ease-linear group-hover:-translate-y-[calc(100%-6rem)]">
                        <span className='bg-base-border text-primary-text px-1 py-0.5 rounded-lg text-sm font-light'>informative</span>
                        <h2 className='text-lg font-light h-[20vh]'>{title}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
