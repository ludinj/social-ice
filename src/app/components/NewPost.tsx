'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
  Progress
} from '@material-tailwind/react';

import Image from 'next/image';
import TextareaAutosize from 'react-textarea-autosize';
import { useState, type FC, type ChangeEvent, useCallback } from 'react';
import { BsCameraVideo, BsImage } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { type SafeUser } from '../../types';
import useUnderDevModal from '../../hooks/useUnderDevModal';
import useCreatePost from '@/hooks/useCreatePost';
import { cn } from '@/libs/utils';

interface NewPostProps {
  currentUser: SafeUser | null;
}

const NewPost: FC<NewPostProps> = ({ currentUser }) => {
  const devModal = useUnderDevModal();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [postDescription, setPostDescription] = useState<string | null>(null);
  const { createPost, progress, isSubmitting, error } = useCreatePost();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file ?? null);
  };
  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(event.target.value);
  };

  const handlePostClick = useCallback(async () => {
    if (!currentUser || postDescription === null) return;
    await createPost(postDescription, selectedImage, currentUser);
    setFocused(false);
    setSelectedImage(null);
    setPostDescription(null);
  }, [currentUser, postDescription, selectedImage, createPost]);
  return (
    <Card className="flex flex-col  rounded-none mb-1">
      {progress > 0 && (
        <Progress
          value={progress}
          color="green"
          className="h-[3px] w-full rounded-md"
        />
      )}
      <CardBody className="flex flex-col gap-2  items-center justify-center py-4 relative">
        <div
          className={cn(
            'absolute w-full h-full  z-10 top-0 left-0 bg-neutral-200/50',
            { hidden: !isSubmitting }
          )}
        />

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center">
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
              {currentUser?.name}
            </Typography>
            <Typography className="text-neutral-500 mr-1">
              @{currentUser?.name}
            </Typography>
            <Typography className="text-neutral-500"> ·2h</Typography>
          </div>
          {/* New post input */}
          <div>
            <TextareaAutosize
              className="resize-none w-full h-auto  outline-none overflow-auto pb-2"
              maxLength={320}
              value={postDescription ?? ''}
              onChange={(e) => {
                handleChangeDescription(e);
              }}
              placeholder="Share your Thoughts!"
              onFocus={() => {
                setFocused(true);
              }}
            />
            {focused && !isSubmitting && (
              <div
                className={cn(
                  'cursor-pointer w-fit rounded-full hover:bg-green-50 px-2 py-1 text-green-600 flex-center'
                )}
              >
                <Typography className={'text-xs flex-center font-bold'}>
                  Todos pueden ver tu post
                </Typography>
              </div>
            )}
          </div>
        </div>
        {selectedImage && (
          <div className="w-full relative h-fit rounded-xl">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="upload"
              className="w-full rounded-xl  inset-0 object-contain"
            />
            <AiFillCloseCircle
              size={36}
              className={cn(
                'text-gray-700 absolute top-1 right-1 hover:text-gray-500 cursor-pointer',
                { hidden: isSubmitting }
              )}
              onClick={() => {
                setSelectedImage(null);
              }}
            />
          </div>
        )}
      </CardBody>
      {!isSubmitting && (
        <CardFooter className="flex justify-between  items-center  py-2">
          <div className="flex gap-4">
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              <div className="cursor-pointer">
                <BsImage size={24} />
              </div>
            </label>
            <button
              className="cursor-pointer"
              onClick={() => {
                devModal.onOpen();
              }}
            >
              <BsCameraVideo size={24} />
            </button>
          </div>
          <Button
            variant="filled"
            className="hover:shadow-none shadow-none bg-green-700 font-bold"
            type="button"
            disabled={
              postDescription === null ||
              postDescription?.length < 1 ||
              isSubmitting
            }
            size="sm"
            onClick={() => {
              void handlePostClick();
            }}
          >
            Post
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NewPost;
