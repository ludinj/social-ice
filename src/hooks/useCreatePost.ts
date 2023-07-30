import { useCallback, useState } from 'react';
import axios from 'axios';
import { type SafeUser } from '../types';

const useCreatePost = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const createPost = useCallback(
    async (
      postDescription: string,
      selectedImage: File | null,
      currentUser: SafeUser,
      parentPostId?: string
    ) => {
      const newPost = {
        id: currentUser.id,
        description: postDescription,
        imageUrl: null,
        parentPostId
      };

      setIsSubmitting(true);
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'social-ice-preset');
        formData.append(
          'cloud_name',
          `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string}`
        );
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
            }/image/upload`,
            formData,
            {
              // Configure Axios to track the upload progress
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(progress); // Update the progress state
              }
            }
          );

          if (response.status === 200) {
            const result = response.data;
            newPost.imageUrl = result.secure_url;
            console.log('Upload success!');
            const post = await axios.post('/api/post', newPost);

            return post;
          } else {
            console.log('Upload failed!');
          }
        } catch (error) {
          setError({ message: 'Error uploading image.', error });
        } finally {
          setIsSubmitting(false);
          setProgress(0);
        }
      }
    },
    []
  );
  return { createPost, progress, isSubmitting, error };
};
export default useCreatePost;
