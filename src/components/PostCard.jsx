import uploadServices from '../services/upload'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-full py-3 px-2 space-y-2 hover:scale-95 transition-all'>
                {featuredImage && (
                    <div className='h-[50%]'>
                        <img
                            src={uploadServices.getFilePreview(featuredImage)}
                            alt={title}
                            className='w-full h-full border-4 border-base-border rounded-md object-cover object-bottom'
                        />
                    </div>
                )}
                <div className='w-full h-1/2 overflow-y-auto'>
                    <span className='bg-accent text-base-main px-1 py-0.5 rounded-lg text-sm font-light'>post title</span>
                    <h2 className='text-lg font-light'>{title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
