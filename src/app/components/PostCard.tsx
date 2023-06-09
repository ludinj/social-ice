import { Card } from '@material-tailwind/react';
import React, { FC } from 'react';

interface PostCardProps {}

const PostCard: FC<PostCardProps> = ({}) => {
  return (
    <Card className="w-full border-[1px] border-neutral-100">PostCard</Card>
  );
};
export default PostCard;
