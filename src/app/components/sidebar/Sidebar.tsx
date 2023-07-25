'use client';

import { useSession } from 'next-auth/react';
import { AiOutlineMessage } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import SidebarItem from './SidebarItem';
import { BsBookmark } from 'react-icons/bs';
import { MdNotificationsNone } from 'react-icons/md';
import ProfileButton from './ProfileButton';

import { type FC } from 'react';
import { TbDiamondFilled } from 'react-icons/tb';
interface SidebarProps {
  // currentUser?: SafeUser | null;
}
const sidebarItems = [
  {
    label: 'Inbox',
    icon: AiOutlineMessage,
    size: 28,
    path: '/'
  },
  {
    label: 'Guardados',
    icon: BsBookmark,
    size: 28,
    path: '/'
  },
  {
    label: 'Inbox',
    icon: AiOutlineMessage,
    size: 28
  },
  {
    label: 'Notificaciones',
    icon: MdNotificationsNone,
    size: 28,
    path: '/'
  },
  {
    label: 'Profile',
    icon: CgProfile,
    size: 28,
    path: '/profile'
  }
];
const Sidebar: FC<SidebarProps> = ({}) => {
  const { status, data } = useSession();
  console.log(data?.user);
  if (status === 'loading') {
    console.log('loading');
  }
  return (
    <header className="sticky  hidden sm:flex sm:flex-col  top-0 left-0 h-screen w-full sm:w-[30%] flex-shrink-[2] items-end  ">
      <div className="h-full p-2 w-full xl:w-[16rem] flex items-end flex-col ">
        <nav className="flex h-full flex-col items-start w-fit">
          <div className="mb-2 p-2 hover:bg-neutral-200 rounded-full cursor-pointer ">
            <TbDiamondFilled size={30} className="text-green-500" />
          </div>
          <ul className="flex flex-col gap-4">
            {sidebarItems.map((item, i) => (
              <SidebarItem
                size={item.size}
                icon={item.icon}
                label={item.label}
                key={i}
                path={item.path}
              />
            ))}
          </ul>
          {data && <ProfileButton currentUser={data.user} />}
        </nav>
      </div>
    </header>
  );
};
export default Sidebar;
