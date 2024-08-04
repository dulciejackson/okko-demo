import { Link } from "react-router-dom";
import { Post } from "../data/post";
import { User } from "../data/user";
import { UserAvatar } from "./UserAvatar";

interface PostCardProps {
    post: Post;
    author?: User;
    clickable?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({post, author, clickable}) => {
    if (!author) return null;

    if (!clickable) return (
        <div>
            <article className='p-6 border border-gray-100 rounded-md w-full shadow-lg text-left'>
                <div className="flex flex-row gap-2 items-center">
                    <UserAvatar user={author} small />
                    <address className="not-italic font-bold">{author.username.toLowerCase()}</address>
                </div>
                <h1 className='font-semibold mt-2'>{post.title}</h1>
                <p>{post.body}</p>
            </article>
        </div>
    )

    return (
        <Link to={`/users/${author.id}`}>
            <article className='p-6 border border-gray-100 rounded-md w-full shadow-lg text-left'>
                <div className="flex flex-row gap-2 items-center">
                    <UserAvatar user={author} small />
                    <address className="not-italic font-bold">{author.username.toLowerCase()}</address>
                </div>
                <h1 className='font-semibold mt-2'>{post.title}</h1>
                <p>{post.body}</p>
            </article>
        </Link>
    )
}