import NewPost from './components/NewPost';
import RightBar from './components/RightBar';
import HeaderTabs from './components/HeaderTabs';
import PostFeed from './components/post-feed/PostFeed';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import InnerLayout from './components/InnerLayout';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  return (
    <InnerLayout>
      <HeaderTabs />
      {currentUser && (
        <div className="p-4 border-neutral-200 border-[1px]">
          <NewPost currentUser={currentUser} />
        </div>
      )}
      <PostFeed />
    </InnerLayout>
  );
}
