import { useEffect, useMemo, useState } from 'react';
import useGetPosts from '../hooks/useGetPosts'
import { User } from '../data/user';
import { SelectableUserAvatar } from '../components/SelectableUserAvatar';
import { PostCard } from '../components/Post';
import { useUsers } from '../contexts/UsersContext';
import { Link } from 'react-router-dom';
import { MdAdd } from "react-icons/md";
import { TailSpin, ThreeDots } from 'react-loader-spinner';

function App() {
  const {users, isLoading: usersLoading} = useUsers();
  const {data: posts, isLoading: postsLoading} = useGetPosts();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Filter the visible post list down to only those authored by selected users
  const filteredPosts = useMemo(() => posts?.filter(post => !!selectedUsers?.find(user => user.id === post.userId)), [selectedUsers, posts]);

  useEffect(() => {
    if (users && !usersLoading) {
      setSelectedUsers(users);
    }
  }, [users, usersLoading]);

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
      <div className='mx-8 mt-8 mb-4'>
        <h1 className='text-lg font-bold'>Posts</h1>
      </div>

      <Link to="/posts/new" className='absolute top-0 right-0 mt-8 mr-4'>
          <MdAdd size={24} />
      </Link>
      
      <div className='flex flex-row items-center lg:justify-center gap-4 overflow-auto w-full px-8 py-2'>
        <TailSpin visible={usersLoading} wrapperClass='mb-4' color='gray' ariaLabel='User loading spinner' />
        {
          users?.map(user => (
            <SelectableUserAvatar
              key={user.id}
              user={user} 
              isSelected={!!selectedUsers?.includes(user)} 
              onClick={() => updateSelectedUsers(user)} 
            />
          ))
        }
      </div>
      <div className='flex flex-col items-center gap-6 mt-4 m-8 lg:max-w-[60%]'>
        <ThreeDots visible={postsLoading} color="gray" />
        {
          filteredPosts?.map(post => {
            const postUser = users?.find(user => user.id === post.userId);
            return (
              <PostCard post={post} author={postUser} clickable key={post.id} />
            )
          })
        }
      </div>
    </div>
  )
}

export default App;
