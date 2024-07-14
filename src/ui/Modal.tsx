import React, {
  type PropsWithChildren,
  type ReactElement,
  createContext,
  useState,
  useContext,
} from 'react';

import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import useOutsideClick from '../hooks/useOutsideClick';

type ModalContextType = {
  openName: string;
  openModal: (value: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  openName: '',
  openModal() {},
  closeModal() {},
});

export default function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState<string>('');

  const openModal = (value: string) => {
    setOpenName(value);
  };

  const closeModal = () => setOpenName('');

  return (
    <ModalContext.Provider value={{ openName, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: { children: ReactElement; opens: string }) {
  const { openModal } = useContext(ModalContext);

  return React.cloneElement(children, {
    onClick: () => openModal(opens),
  });
}

function Close({ children }: { children: ReactElement }) {
  const { closeModal } = useContext(ModalContext);

  return React.cloneElement(children, { onCloseModal: closeModal });
}

function Header({ children }: PropsWithChildren) {
  const { closeModal } = useContext(ModalContext);

  return (
    <div className='flex items-center justify-between px-4 py-3 border-b border-b-gray-300 dark:bg-gray-800 dark:border-b-gray-700'>
      <h2 className='text-2xl font-medium'>{children}</h2>
      <button className='text-2xl' onClick={closeModal}>
        <HiXMark />
      </button>
    </div>
  );
}

function Body({ children }: PropsWithChildren) {
  return (
    <div className='text-slate-600 overflow-y-scroll scroll-smooth px-8 py-2 dark:bg-gray-800'>
      {children}
    </div>
  );
}

function Window({
  children,
  openWindow,
}: PropsWithChildren & {
  openWindow: string;
}) {
  const { openName, closeModal } = useContext(ModalContext);

  const ref = useOutsideClick<HTMLDivElement>(closeModal);

  if (openName !== openWindow) return null;

  return createPortal(
    <div className='w-full h-full backdrop-blur-sm absolute inset-0 bg-gray-50/25 transition-all duration-300 z-10 dark:bg-gray-900/75'>
      <div
        ref={ref}
        className='bg-slate-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden shadow-md shadow-gray-400 z-20 dark:shadow-gray-900'
      >
        {children}
      </div>
    </div>,
    document.body!
  );
}

Modal.Open = Open;
Modal.Close = Close;
Modal.Header = Header;
Modal.Body = Body;
Modal.Window = Window;
