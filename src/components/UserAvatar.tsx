import { User } from "../data/user"

interface UserAvatarProps {
    user: User;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({user}) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='h-16 aspect-square rounded-full bg-gray-500'>
            </div>
            <p className='text-xs'>{user.username.toLowerCase()}</p>
        </div>
    )
}