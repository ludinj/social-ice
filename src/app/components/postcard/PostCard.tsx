'use client';
import {
  Card,
  CardBody,
  CardFooter,
  Tooltip,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState, type FC } from 'react';
import { SlOptions } from 'react-icons/sl';
import { BiMessageDetail } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsShare, BsBookmark } from 'react-icons/bs';
import { type IPost } from '@/types';
import axios from 'axios';
import { cn } from '@/libs/utils';
import useCommentModal from '@/hooks/useCommentModal';
import { useSession } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';

interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { imageUrl, description, author, authorId } = post;
  const { data } = useSession();
  const loginModal = useLoginModal();
  const currentUser = data?.user;
  const [isLiked, setIsLiked] = useState<boolean>(
    post.likesId.includes(currentUser?.id ?? '')
  );
  const { onOpen } = useCommentModal();
  const handleLike = async () => {
    const action = isLiked ? 'dislike' : 'like';
    console.log(currentUser?.id);

    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    try {
      await axios.post('/api/post/like-dislike', {
        postId: post.id,
        userId: currentUser.id,
        action
      });
      setIsLiked((current) => !current);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full h-fit relative border rounded-none border-neutral-200 flex-row gap-2 hover:bg-neutral-100 cursor-pointer">
      <div className="w-full  ">
        <CardBody className="">
          <div className="flex items-center border-b-[1px] border-neutral-300 pb-1">
            <div className="h-10 w-10 relative rounded-full">
              <Image
                alt="profile"
                src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
                width={100}
                height={100}
                className="h-10 w-10 rounded-full"
              />
            </div>
            <Typography className="text-black font-semibold mr-1">
              {author.name}
            </Typography>
            <Typography className="text-neutral-500 mr-1">
              @{author.name}
            </Typography>
            <Typography className="text-neutral-500"> ·2h</Typography>
            <SlOptions
              size={20}
              color="black"
              className="ml-auto cursor-pointer"
            />
          </div>
          <Typography className="mt-2">{description}</Typography>

          {imageUrl && (
            <div className="relative  w-full h-auto max-h-[30rem]  mt-2 rounded-xl overflow-clip">
              <img
                src={imageUrl}
                alt="post-image"
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
        </CardBody>
        <CardFooter className="flex items-center  justify-start py-2">
          <Tooltip
            content="Comment"
            placement="bottom-start"
            className="text-[12px] p-1 bg-neutral-500 rounded-sm"
          >
            <div
              className="card-button__container  hover:bg-sky-100 hover:text-sky-600 group"
              onClick={() => {
                onOpen(post);
              }}
            >
              <BiMessageDetail size={20} />
              <Typography className="text-xs self-end">20</Typography>
            </div>
          </Tooltip>

          <Tooltip
            content="Like"
            placement="bottom-start"
            className="text-[12px] p-1 bg-neutral-500 rounded-sm"
          >
            <div
              className={cn(
                'card-button__container hover:bg-pink-100 hover:text-pink-500 group',
                { 'text-pink-500': isLiked }
              )}
              onClick={() => {
                void handleLike();
              }}
            >
              {isLiked ? (
                <AiFillHeart size={20} />
              ) : (
                <AiOutlineHeart size={20} />
              )}
              <Typography className="text-xs  self-end">
                {post.likesId.length}
              </Typography>
            </div>
          </Tooltip>

          <Tooltip
            content="Favorite"
            placement="bottom-start"
            className="text-[12px] p-1 bg-neutral-500 rounded-sm"
          >
            <div className="card-button__container hover:bg-orange-100 hover:text-yellow-600 group">
              <BsBookmark size={20} />
              <Typography className="text-xs  self-end">120</Typography>
            </div>
          </Tooltip>
          <Tooltip
            content="Share"
            placement="bottom-start"
            className="text-[12px] p-1 bg-neutral-500 rounded-sm"
          >
            <div className="flex   items-center justify-center text-neutral-600 hover:bg-sky-100 hover:text-sky-600 group transition rounded-md p-2 ">
              <BsShare size={20} />
            </div>
          </Tooltip>
        </CardFooter>
      </div>
    </Card>
  );
};
export default PostCard;
