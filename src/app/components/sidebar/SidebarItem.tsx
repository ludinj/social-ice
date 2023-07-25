'use client';
import { ListItem, Typography } from '@material-tailwind/react';

import { type IconType } from 'react-icons';
import React, { type FC } from 'react';
import Link from 'next/link';
interface SidebarItemProps {
  label: string;
  icon: IconType;
  path?: string;
  size: number;
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  path,
  size
}) => {
  return (
    <Link href={path ?? '/'}>
      <ListItem className=" rounded-full  w-fit p-3  xl:pl-2 xl:pr-6 gap-4 flex-center   xl:justify-start my-1">
        <Icon className="text-black font-semibold" size={size} />
        <Typography className="hidden xl:block text-neutral-xl">
          {label}
        </Typography>
      </ListItem>
    </Link>
  );
};
export default SidebarItem;
