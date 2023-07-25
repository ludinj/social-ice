'use client';
import { Typography } from '@material-tailwind/react';
import {
  type FC,
  type ReactElement,
  useCallback,
  useEffect,
  useState
} from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  disable?: boolean;
  actionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  disable,
  actionLabel
}) => {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disable) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disable, onClose]);

  const handleSubmit = useCallback(() => {
    if (disable) return;
    onSubmit();
  }, [disable, onSubmit]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div
            className={`
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute right-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  <Typography variant="h3">{title}</Typography>
                </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
