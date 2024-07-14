import { type ComponentPropsWithoutRef, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className='outline-none rounded-md border px-1.5 py-2 border-gray-300 bg-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-base text-slate-700 hover:bg-emerald-100 transition-all duration-300 dark:bg-gray-900 dark:text-slate-100 dark:hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-slate-500'
      />
    );
  }
);

export default Input;
