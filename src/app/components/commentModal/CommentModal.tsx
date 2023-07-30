'use client';
import useCommentModal from '@/hooks/useCommentModal';
import { type FC } from 'react';
import Modal from '../Modal';
import NewPost from '../NewPost';
import { type SafeUser } from '@/types';
import Image from 'next/image';
import { Typography } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';

interface CommentModalProps {}

const CommentModal: FC<CommentModalProps> = () => {
  const { data } = useSession();

  const currentUser = data?.user;
  const { post, isOpen, onClose } = useCommentModal();

  if (!post) return null;
  const { author, description, imageUrl, id } = post;
  console.log({ author, imageUrl, description });
  const body = (
    <>
      <div className="mb-2 border-b-[1px] border-neutral-300">
        <div className="flex items-center pb-2 gap-2 mb-1">
          <div className="h-8 w-8 relative rounded-full">
            <Image
              alt="profile"
              src={
                author.image ??
                'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
              }
              fill
              className="h-10 w-10 rounded-full"
            />
          </div>
          <Typography className="text-black font-semibold">
            {author.name}
          </Typography>
          <Typography className="text-neutral-500">
            @{author.name} <span>· 2h</span>
          </Typography>
        </div>
        <Typography className="mn-3">{description}</Typography>
      </div>
      <NewPost currentUser={currentUser ?? null} parentPostId={id} />
    </>
  );
  return <Modal body={body} isOpen={isOpen} onClose={onClose} />;
};

export default CommentModal;
