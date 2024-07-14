import { ComponentPropsWithoutRef, type ReactNode } from 'react';

type CheckBoxType = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

export default function ChechBox({ children, ...props }: CheckBoxType) {
  return (
    <div className='bg-gray-50 rounded-md text-xl px-10 py-6 flex items-center gap-4 dark:bg-gray-800'>
      <input
        type='checkbox'
        className='w-6 h-6 outline-none border-none disabled:cursor-not-allowed'
        {...props}
      />
      <label htmlFor={props.id} className='text-xl font-light leading-9'>
        {children}
      </label>
    </div>
  );
}
