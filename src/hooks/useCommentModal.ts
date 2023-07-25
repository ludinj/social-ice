import { create } from 'zustand';
import { type IPost } from '../types';

interface CommentModal {
  isOpen: boolean;
  onOpen: (post: IPost | null) => void;
  onClose: () => void;
  post: IPost | null;
}

const useCommentModal = create<CommentModal>((set) => ({
  isOpen: false,
  onOpen: (post) => {
    set({ isOpen: true, post });
  },
  onClose: () => {
    set({ isOpen: false, post: null });
  },
  post: null
}));

export default useCommentModal;
