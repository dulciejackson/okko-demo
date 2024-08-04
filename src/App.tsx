import { useEffect, useMemo, useState } from 'react';
import { UserAvatar } from './components/UserAvatar';
import useGetPosts from './hooks/useGetPosts'
import useGetUsers from './hooks/useGetUsers';
import { User } from './data/user';

function App() {
  const {data: users, isLoading} = useGetUsers();
  const {data: posts} = useGetPosts();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Filter the visible post list down to only those authored by selected users
  const filteredPosts = useMemo(() => posts?.filter(post => !!selectedUsers?.find(user => user.id === post.userId)), [selectedUsers, posts]);

  useEffect(() => {
    if (users && !isLoading) {
      setSelectedUsers(users);
    }
  }, [users, isLoading]);

  const updateSelectedUsers = (user: User) => {
    // If the user is currently in the selected users, remove it
    if (selectedUsers?.includes(user)) {
      setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.id !== user.id));
    // And if they're not selected yet, add them
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mx-8 mt-8 mb-2'>
        <h1 className='text-lg font-bold'>Posts</h1>
      </div>
      <div className='flex flex-row items-center gap-4 overflow-scroll w-full px-8 py-2'>
        {
          users?.map(user => (
            <UserAvatar 
              key={user.id}
              user={user} 
              isSelected={!!selectedUsers?.includes(user)} 
              onClick={() => updateSelectedUsers(user)} 
            />
          ))
        }
      </div>
      <div className='flex flex-col gap-6 mt-4 m-8'>
        {
          filteredPosts?.map(post => {
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
