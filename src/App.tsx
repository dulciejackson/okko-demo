import { UserAvatar } from './components/UserAvatar';
import useGetPosts from './hooks/useGetPosts'
import useGetUsers from './hooks/useGetUsers';

function App() {
  const {data: users} = useGetUsers();
  const {data: posts} = useGetPosts();

  console.log(posts);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mx-8 mt-8 mb-2'>
        <h1 className='text-lg font-bold'>Posts</h1>
      </div>
      <div className='flex flex-row items-center gap-4 overflow-scroll w-full px-8 py-2'>
        <div className='flex flex-col items-center'>
          <div className='h-16 aspect-square rounded-full bg-gray-500'>
          </div>
          <p className='text-xs'>All</p>
        </div>
        {
          users?.map(user => (
            <UserAvatar user={user} />
          ))
        }
      </div>
      <div className='flex flex-col gap-6 mt-4 m-8'>
        {
          posts?.map(post => {
            const postUser = users?.find(user => user.id === post.userId);
            return (
              <article className='p-6 border border-gray-500 rounded-md w-full'>
                <h1 className='font-bold text-lg'>{post.title}</h1>
                <p>{post.body}</p>
                <p>{postUser?.username.toLowerCase()}</p>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}

export default App;
