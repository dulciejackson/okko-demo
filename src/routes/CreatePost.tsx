import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { MdSend } from "react-icons/md";
import useCreatePost from "../hooks/useCreatePost";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PostFormInputs {
    title: string;
    body: string;
}

export const CreatePost = () => {
    const createPostMutation = useCreatePost();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<PostFormInputs>()

    const onSubmit: SubmitHandler<PostFormInputs> = (data) => {
        if (!createPostMutation.isPending) {
            createPostMutation.mutate({
                title: data.title,
                body: data.body,
                userId: 100
            })
        }
    }

    useEffect(() => {
        if (createPostMutation.isSuccess) {
            navigate("/")
        }
    }, [createPostMutation])

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="w-full lg:max-w-[60%] p-8 flex flex-col items-center">
                <h1 className='text-lg font-bold mb-4'>Create a post</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <Input {...register("title", {required: true, minLength: 3})} placeholder="Add a title" label="Title" id="post-title" error={errors.title}/>
                    <TextArea {...register("body", {required: true, minLength: 10})} placeholder="What do you want to say?" label="Post" id="post-body" error={errors.body}/>
                    <button type="submit" disabled={createPostMutation.isPending} className={`flex flex-row gap-4 rounded-md items-center justify-center p-2 text-white ${createPostMutation.isPending ? "bg-gray-500" : "bg-black"}`}>
                        <p>Post</p>
                        <MdSend size={24} color="white" />
                    </button>
                </form>
            </div>
        </div>
    )
}