import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../data/post";

const useGetPosts = () => {
    return useQuery({
    queryKey: ['useGetPosts'],
    queryFn: async () => axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.data)
  })
}

export default useGetPosts;
