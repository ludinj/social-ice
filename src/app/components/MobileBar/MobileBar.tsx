'use client';
import React, { type FC } from 'react';
import SidebarItem from '../sidebar/SidebarItem';

import { IoIosHome } from 'react-icons/io';
import { AiOutlineMessage } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { MdNotificationsNone } from 'react-icons/md';

interface MobileBarProps {}

const MobileBar: FC<MobileBarProps> = ({}) => {
  return (
    <div className="flex sm:hidden border-t fixed bottom-0 w-full px-6 bg-white">
      <div className="flex justify-between items-center w-full ">
        <SidebarItem label="Inbox" icon={IoIosHome} size={24} />
        <SidebarItem label="Guardados" icon={FiSearch} size={24} />
        <SidebarItem
          label="Notificaciones"
          icon={MdNotificationsNone}
          size={24}
        />
        <SidebarItem
          label="Profile"
          icon={AiOutlineMessage}
          path="/profile"
          size={24}
        />
      </div>
    </div>
  );
};

export default MobileBar;
