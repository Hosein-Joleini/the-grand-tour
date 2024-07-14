import { type ComponentPropsWithoutRef, forwardRef } from 'react';

const TextArea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<'textarea'>
>(({ ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className='outline-none rounded-md border px-1.5 py-2 border-gray-300 bg-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-none text-base text-slate-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-slate-100 hover:bg-emerald-100 transition-all duration-300'
    ></textarea>
  );
});

export default TextArea;
