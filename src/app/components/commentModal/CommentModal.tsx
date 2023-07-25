'use client';
import useCommentModal from '@/hooks/useCommentModal';
import { type FC } from 'react';
import Modal from '../Modal';
import NewPost from '../NewPost';
import { type SafeUser } from '@/types';

interface CommentModalProps {
  currentUser: SafeUser | null;
}

const CommentModal: FC<CommentModalProps> = ({ currentUser }) => {
  const { post, isOpen, onClose } = useCommentModal();

  const body = (
    <div>
      <h1>{post?.description}</h1>
      <p>{post?.author.name}</p>
      <NewPost currentUser={currentUser} />
    </div>
  );
  return <Modal body={body} isOpen={isOpen} onClose={onClose} />;
};

export default CommentModal;
