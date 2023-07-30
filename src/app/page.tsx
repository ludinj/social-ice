import NewPost from './components/NewPost';
import PostCard from './components/postcard/PostCard';
import RightBar from './components/RightBar';
import getCurrentUser from '../actions/getCurrentUser';
import HeaderTabs from './components/HeaderTabs';

import { type IPost } from '@/types';
import PostFeed from './components/post-feed/PostFeed';
import { CardBody } from '@material-tailwind/react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  return (
    <main className="flex  gap-4 w-[800px] flex-grow ">
      <div className="h-full w-full max-w-[600px] flex  flex-col ">
        <HeaderTabs />
        {currentUser && (
          <div className="p-4 border-neutral-200 border-[1px]">
            <NewPost currentUser={currentUser} />
          </div>
        )}

        <PostFeed />
      </div>
      <div className="h-full w-[350px] px-4 hidden lg:flex flex-col bg-red-50 mr-2  ">
        <RightBar currentUser={currentUser} />
      </div>
    </main>
  );
}
