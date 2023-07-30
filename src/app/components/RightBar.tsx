'use client';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import React, { type FC } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { type SafeUser } from '../../types';
import { useSession } from 'next-auth/react';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';

interface RightBarProps {}

const RightBar: FC<RightBarProps> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { status, data } = useSession();
  const currentUser = data?.user;
  return (
    <div className="w-full  h-52 bg-red-200 rounded-xl">
      <Card>
        <CardBody className="p-4 flex flex-col gap-5">
          <Typography variant="h5">¿Eres nuevo en Ice?</Typography>
          <Typography className="text-xs text-neutral-500">
            Registrate para disfrutar de un mundo de ideas!
          </Typography>
          {currentUser ? (
            <Typography>{currentUser.name}</Typography>
          ) : (
            <Button
              size="md"
              variant="outlined"
              color="blue-gray"
              className="flex items-center justify-center gap-3"
              onClick={() => {
                void signIn('google');
              }}
            >
              <img
                src="/icons8-google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
              Continue with Google
            </Button>
          )}

          <Button
            size="md"
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center gap-3"
            onClick={() => {
              void signOut();
            }}
          >
            Crear cuentarrar.js
          </Button>
          <Button
            size="md"
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center gap-3"
            onClick={() => {
              registerModal.onOpen();
            }}
          >
            register
          </Button>
          <Button
            size="md"
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center gap-3"
            onClick={() => {
              loginModal.onOpen();
            }}
          >
            login
          </Button>
          <Typography className="text-xs">
            Al registrarte, aceptas los Términos de servicio y la Política de
            privacidad, incluida la política de Uso de Cookies.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default RightBar;
