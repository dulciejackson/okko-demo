import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../data/user";

const useGetUsers = () => {
    return useQuery({
    queryKey: ['useGetUsers'],
    queryFn: async () => axios.get<User[]>(`${import.meta.env.VITE_API_URL}/users`)
        .then(res => res.data)
  })
}

export default useGetUsers;