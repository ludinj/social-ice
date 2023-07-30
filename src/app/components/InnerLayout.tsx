import React, { FC } from 'react';
import RightBar from './RightBar';

interface InnerLayoutProps {
  children: React.ReactNode;
}

const InnerLayout: FC<InnerLayoutProps> = ({ children }) => {
  return (
    <main className="flex  gap-4 w-[800px] flex-grow ">
      <div className="h-full w-full max-w-[600px] flex  flex-col ">
        {children}
      </div>
      <div className="h-full w-[350px] px-4 hidden lg:flex flex-col bg-red-50 mr-2  ">
        <RightBar />
      </div>
    </main>
  );
};

export default InnerLayout;
