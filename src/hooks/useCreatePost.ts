import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../data/post";

const useCreatePost = () => {
    return useMutation({
    mutationKey: ['useCreatePost'],
    mutationFn: async (post: Omit<Post, "id">) => axios.post<Post>(`${import.meta.env.VITE_API_URL}/posts`, JSON.stringify(post))
        .then(res => res.data)
  })
}

export default useCreatePost;