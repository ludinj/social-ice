'use client';
import { Card, Typography, List } from '@material-tailwind/react';

import { AiOutlineMessage } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <Card className="sticky flex flex-col top-0 left-0 h-screen w-full max-w-[17rem] p-4 shadow-xl shadow-blue-gray-900/5 h-s">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List className="flex flex-col items-start">
        <SidebarItem label="Inbox" icon={AiOutlineMessage} />
        <SidebarItem label="Profile" icon={CgProfile} />
      </List>
    </Card>
  );
};
export default Sidebar;
