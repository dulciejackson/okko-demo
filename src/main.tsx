import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Feed from './routes/Feed.tsx'
import { UserProfile } from './routes/UserProfile.tsx'
import { UsersProvider } from './contexts/UsersContext.tsx'
import { CreatePost } from './routes/CreatePost.tsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/users/:userId",
    element: <UserProfile />
  },
  {
    path: "/posts/new",
    element: <CreatePost />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
