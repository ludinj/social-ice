import axios from 'axios';
import { type SafeUser } from '../types';

export const createPost = async (
  postDescription: string,
  selectedImage: File | null,
  currentUser: SafeUser
) => {
  const newPost = {
    id: currentUser.id,
    description: postDescription,
    imageUrl: null
  };
  const baseUrl = window.location.origin;
  console.log(baseUrl);
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
            console.log(progress);
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
      console.error('Error uploading image:', error);
    }
  }
};
