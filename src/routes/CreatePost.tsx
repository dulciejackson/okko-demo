import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { MdOutlineArrowBack, MdSend } from "react-icons/md";
import useCreatePost from "../hooks/useCreatePost";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { ThreeDots } from "react-loader-spinner";

interface PostFormInputs {
    title: string;
    body: string;
}

export const CreatePost = () => {
    const {refetch} = useGetPosts();
    const createPostMutation = useCreatePost();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<PostFormInputs>()

    const onSubmit: SubmitHandler<PostFormInputs> = (data) => {
        // If the create post mutation isn't already in progress, use it now
        if (!createPostMutation.isPending) {
            createPostMutation.mutate({
                title: data.title,
                body: data.body,
                userId: 100
            })
        }
    }

    useEffect(() => {
        // Once the create post mutation succeeds, refetch all posts
        // and then navigate back to the feed
        if (createPostMutation.isSuccess) {
            refetch();
            navigate("/")
        }
    }, [createPostMutation])

    useEffect(() => {
        if (createPostMutation.isError) {
            // TODO: Show error message
            // With this fake API we never get errors, so haven't implemented this yet
        }
    }, [createPostMutation])

    return (
        <div className='flex flex-col items-center justify-center'>
            <Link to="/" className="absolute top-0 left-0 m-4 rounded-md p-2">
                <MdOutlineArrowBack color="black" size={24} />
            </Link>
            <div className="w-full lg:max-w-[60%] p-8 flex flex-col items-center">
                <h1 className='text-lg font-bold mb-4'>Create a post</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <Input {...register("title", {required: true, minLength: 3})} placeholder="Add a title" label="Title" id="post-title" error={errors.title}/>
                    <TextArea {...register("body", {required: true, minLength: 10})} placeholder="What do you want to say?" label="Post" id="post-body" error={errors.body}/>
                    <button type="submit" disabled={createPostMutation.isPending} className={`flex flex-row gap-4 rounded-md items-center justify-center p-2 text-white min-h-10 ${createPostMutation.isPending ? "bg-gray-500" : "bg-black"}`}>
                        {createPostMutation.isPending ? (
                            <ThreeDots visible={true} color="white" height={12} />
                        ) : (
                            <>
                                <p>Post</p>
                                <MdSend size={24} color="white" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}