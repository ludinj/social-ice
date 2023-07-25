'use client';
import { type FC, type ReactNode } from 'react';
import ClientOnly from './ClientOnly';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <ClientOnly>
      {/* <div className="w-full lg:max-w-[1100px] xl:max-w-[1280px] flex justify-center bg-yellow-200"> */}
      <div className="w-full  flex justify-center ">{children}</div>
    </ClientOnly>
  );
};

export default Container;
