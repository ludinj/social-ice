import axios from 'axios';

export const likeDislikePost = async (
  postId: string,
  userId: string,
  action: string
) => {
  return await axios.post('/api/post/like-dislike', { postId, userId, action });
};
