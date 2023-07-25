'use client';
import { type IPost } from '@/types';
import { type FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostCard from '../postcard/PostCard';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';

interface PostFeedProps {}

const PostFeed: FC<PostFeedProps> = ({}) => {
  const {
    data: posts,
    isLoading,
    error
  } = useQuery<IPost[]>({
    queryKey: ['post'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/post');
      return res.data;
    }
  });
  return (
    <div className="flex  flex-col gap-1 w-full items-center">
      {posts?.map((post: IPost) => (
        <PostCard key={post.id} post={post} />
      ))}
      {isLoading && <PuffLoader size={40} color="green" />}
    </div>
  );
};

export default PostFeed;
