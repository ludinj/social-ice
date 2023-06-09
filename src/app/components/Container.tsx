'use client';
import { type FC, type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
    max-w-[2520px]
    h-full
    w-full
    px-2
    md:px-0
    flex justify-center
  "
    >
      {children}
    </div>
  );
};

export default Container;
