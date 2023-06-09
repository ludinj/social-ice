'use client';
import { ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';

import { type IconType } from 'react-icons';
import React, { type FC } from 'react';

interface SidebarItemProps {
  label: string;
  icon: IconType;
}

const SidebarItem: FC<SidebarItemProps> = ({ label, icon: Icon }) => {
  return (
    <ListItem className="hover:bg-green-200 rounded-2xl w-fit pl-2 pr-4 py-2 gap-4">
      <ListItemPrefix>
        <Icon className="h-8 w-8" />
      </ListItemPrefix>
      <Typography className="hidden md:block">{label}</Typography>
    </ListItem>
  );
};
export default SidebarItem;
