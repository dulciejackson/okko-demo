import { UserAvatar, UserAvatarProps } from "./UserAvatar";

interface SelectableUserAvatarProps extends UserAvatarProps {
    isSelected: boolean;
    onClick: () => void;
}

export const SelectableUserAvatar: React.FC<SelectableUserAvatarProps> = ({user, isSelected, onClick}) => {
    return (
        <button className='flex flex-col items-center' onClick={onClick}>
            <div className={`rounded-full border-4 border-white outline outline-2 ${isSelected ? "outline-blue-500" : "outline-gray-300"}`}>
                <UserAvatar user={user} />
            </div>
            <p className='mt-2 text-xs'>{user.username.toLowerCase()}</p>
        </button>
    )
}