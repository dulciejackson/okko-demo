import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../data/post";

const useGetPosts = () => {
    return useQuery({
    queryKey: ['useGetPosts'],
    queryFn: async () => axios.get<Post[]>(`${import.meta.env.VITE_API_URL}/posts`)
        .then(res => res.data)
  })
}

export default useGetPosts;
