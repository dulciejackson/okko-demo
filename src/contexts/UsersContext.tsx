import { createContext, PropsWithChildren, useContext } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { User } from "../data/user";

interface UsersContextProps {
    users: User[];
    isLoading: boolean;
}

const UsersContext = createContext<UsersContextProps>({
    users: [],
    isLoading: true
});

export const UsersProvider: React.FC<PropsWithChildren> = ({children}) => {
    const {data: users, isLoading} = useGetUsers();

    return (
        <UsersContext.Provider value={{
            users: users || [],
            isLoading
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsers = () => useContext(UsersContext);