import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../data/post";

const useGetPostsByUser = (userId: string | undefined ) => {
    return useQuery({
        queryKey: ['useGetPostsByUser'],
        queryFn: async () => axios.get<Post[]>(`${import.meta.env.VITE_API_URL}/posts?userId=${userId}`)
            .then(res => res.data)
  })
}

export default useGetPostsByUser;