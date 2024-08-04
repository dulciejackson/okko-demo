import { Link, useParams } from "react-router-dom";
import { useUsers } from "../contexts/UsersContext";
import { useMemo } from "react";
import { UserAvatar } from "../components/UserAvatar";
import useGetPostsByUser from "../hooks/useGetPostsByUser";
import { PostCard } from "../components/Post";
import { MdOutlineArrowBack } from "react-icons/md";

export const UserProfile: React.FC = () => {
    let { userId } = useParams();
    const {users} = useUsers();
    const user = useMemo(() => users.find(user => user.id === Number(userId)), [users, userId]);

    const {data: userPosts} = useGetPostsByUser(userId);

    // TODO: Redirect to feed
    if (!user) return null;

    return (
        <div className='flex flex-col items-center justify-center'>
            <Link to="/" className="absolute top-0 left-0 m-4 rounded-md p-2">
                <MdOutlineArrowBack color="white" size={24} />
            </Link>
            <div className="w-full aspect-[3/1] lg:aspect-[6/1] overflow-hidden rounded-b-md">
                <img 
                    src={`https://picsum.photos/seed/${user.username}-header/600/400`} 
                    alt={`Profile header image photo for user ${user.username}`} 
                    className="w-full"
                />
            </div>
            <div className="rounded-full border-4 border-white -mt-8">
                <UserAvatar user={user} />
            </div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <address className="text-sm text-gray-400 not-italic">@{user.username.toLowerCase()}</address>
            
            <div className="flex flex-col gap-6 mt-4 m-8 lg:max-w-[60%]">
                {userPosts?.map(userPost => (
                    <PostCard key={userPost.id} post={userPost} author={user} />
                ))}
            </div>
        </div>
    )
}