'use client';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import Loader from './ui/Loader';

interface ClientOnlyProps {
  children: ReactNode;
}

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return <Loader />;
  }
  return <>{children}</>;
};

export default ClientOnly;
