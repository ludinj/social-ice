'use client';
import useUnderDevModal from '@/hooks/useUnderDevModal';

import Modal from '../Modal';

const UnderDevModal = () => {
  const devModal = useUnderDevModal();

  const body = (
    <>
      <img alt="under-dev" className="w-full" src={'/underdev.gif'} />
    </>
  );
  return (
    <Modal
      body={body}
      isOpen={devModal.isOpen}
      onClose={devModal.onClose}
      title="Feature under development"
    />
  );
};

export default UnderDevModal;
