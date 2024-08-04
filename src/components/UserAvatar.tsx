import { User } from "../data/user"

export interface UserAvatarProps {
    user: User;
    small?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({user, small}) => {
    return (
        <div className={`${small ? `h-10` : "h-16"} aspect-square rounded-full overflow-hidden`}>
            <img 
                src={`https://picsum.photos/seed/${user.username}/200`} 
                alt={`Profile photo for user ${user.username}`} 
            />
        </div>
    )
}