import { PropsWithChildren } from 'react';
import Button from './Button';

export default function ConfirmingDelete({
  onCloseModal,
  onDelete,
  children,
  isDeleting,
  isSuccess,
}: PropsWithChildren & {
  onCloseModal?: () => void;
  onDelete: () => void;
  isSuccess: boolean;
  isDeleting: boolean;
}) {
  function handleClick() {
    onDelete();
    if (isSuccess) onCloseModal?.();
  }

  return (
    <div className='w-80 flex flex-col mb-4'>
      <p className='text-lg font-medium text-slate-600 dark:text-slate-100 my-4'>
        {children}
      </p>
      <div className='flex items-center gap-4 justify-end'>
        <Button
          btnType='delete'
          onClick={handleClick}
          isPending={isDeleting}
          disabled={isDeleting}
        >
          حذف
        </Button>
        <Button
          btnType='secondary'
          onClick={onCloseModal}
          disabled={isDeleting}
        >
          لغو
        </Button>
      </div>
    </div>
  );
}
