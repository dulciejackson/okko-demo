import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../contexts/UsersContext";
import { useMemo } from "react";
import { UserAvatar } from "../components/UserAvatar";
import useGetPostsByUser from "../hooks/useGetPostsByUser";
import { PostCard } from "../components/Post";
import { MdOutlineArrowBack } from "react-icons/md";
import { TailSpin, ThreeDots } from "react-loader-spinner";

export const UserProfile: React.FC = () => {
    let { userId } = useParams();
    const navigate = useNavigate();
    const {users, isLoading: usersLoading} = useUsers();
    const user = useMemo(() => users.find(user => user.id === Number(userId)), [users, userId]);

    const {data: userPosts, isLoading: postsLoading} = useGetPostsByUser(userId);

    if (!user) {
        navigate("/");
        return;
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <Link to="/" className="absolute top-0 left-0 m-4 rounded-md p-2">
                <MdOutlineArrowBack color="white" size={24} />
            </Link>
            <div className="w-full aspect-[3/1] lg:aspect-[6/1] overflow-hidden rounded-b-md bg-gray-500">
                {!usersLoading && (
                    <img 
                        src={`https://picsum.photos/seed/${user.username}-header/600/400`} 
                        alt={`Profile header image photo for user ${user.username}`} 
                        className="w-full"
                    />  
                )}
            </div>
            <div className="rounded-full border-4 border-white -mt-8">
                {usersLoading ? (
                    <TailSpin visible={true} color='gray' ariaLabel='User loading spinner' />
                ) : (
                    <UserAvatar user={user} />
                )}
            </div>
            {
                usersLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div>
                        <h1 className="text-xl font-bold">{user.name}</h1>
                        <address className="text-sm text-gray-400 not-italic">@{user.username.toLowerCase()}</address>
                    </div>
                )
            }
            
            <div className="flex flex-col items-center gap-6 mt-4 m-8 lg:max-w-[60%]">
                <ThreeDots visible={postsLoading} color="gray" />
                {userPosts?.map(userPost => (
                    <PostCard key={userPost.id} post={userPost} author={user} />
                ))}
            </div>
        </div>
    )
}