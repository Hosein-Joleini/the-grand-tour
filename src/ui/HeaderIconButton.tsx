import { ComponentPropsWithoutRef, ReactNode } from 'react';

type HeaderIconButtonType = {
  icon: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export default function HeaderIconButton({
  icon,
  ...props
}: HeaderIconButtonType) {
  return (
    <button
      {...props}
      className='text-[1.5rem] font-medium text-emerald-600 hover:bg-emerald-100 outline-none rounded-md focus:ring-1 focus:ring-emerald-600 transition-all duration-300 p-1 dark:hover:bg-gray-700'
    >
      {icon}
    </button>
  );
}
