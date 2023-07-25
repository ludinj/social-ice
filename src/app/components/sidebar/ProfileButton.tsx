'use client';
import {
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent
} from '@material-tailwind/react';
import Image from 'next/image';
import React, { type FC } from 'react';
import { SlOptions } from 'react-icons/sl';
import { type SafeUser } from '../../../types';

interface ProfileButtonProps {
  currentUser?: SafeUser | null;
}

const ProfileButton: FC<ProfileButtonProps> = ({ currentUser }) => {
  return (
    <div className="bg-transparent shadow-none hover:shadow-none hover:bg-neutral-300 lowercase hover cursor-pointer items-center w-fit xl:w-full mt-auto mb-4 rounded-full p-2 gap-2">
      <Popover placement="top-start">
        <PopoverHandler>
          <div className="flex gap-2 items-center">
            <Image
              alt="profile"
              src={
                currentUser?.image ??
                'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
              }
              width={100}
              height={100}
              className="h-10 w-10 rounded-full"
            />
            <div className="relative w-full items-center hidden xl:flex">
              <div>
                <Typography className="text-black">
                  {currentUser?.name}
                </Typography>
                <Typography className="text-neutral-500 text-sm">
                  @{currentUser?.name}
                </Typography>
              </div>
              <SlOptions className="ml-auto mr-1 text-neutral-800" size={16} />
            </div>
          </div>
        </PopoverHandler>
        <PopoverContent className="shadow-md p-0 text-neutral-800  w-[280px] font-semibold cursor-pointer overflow-hidden ">
          <Typography className="text-neutral-800 py-3 px-5  font-semibold cursor-pointer hover:bg-neutral-100">
            Agregar cuenta existent
          </Typography>
          <Typography className="text-neutral-800 py-3 px-5 font-semibold cursor-pointer hover:bg-neutral-100">
            Cerrar session de @{currentUser?.name}
          </Typography>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProfileButton;
