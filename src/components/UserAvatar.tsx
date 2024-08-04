import { User } from "../data/user"

interface UserAvatarProps {
    user: User;
    isSelected: boolean;
    onClick: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({user, isSelected, onClick}) => {
    return (
        <button className='flex flex-col items-center' onClick={onClick}>
            <div className={`h-16 aspect-square rounded-full overflow-hidden border-4 border-white outline outline-2 ${isSelected ? "outline-blue-500" : "outline-gray-300"}`}>
                <img 
                    src={`https://picsum.photos/seed/${user.username}/200`} 
                    alt={`Profile photo for user ${user.username}`} 
                />
            </div>
            <p className='mt-2 text-xs'>{user.username.toLowerCase()}</p>
        </button>
    )
}