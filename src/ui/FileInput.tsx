import { type ComponentPropsWithoutRef, forwardRef } from 'react';

const FileInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'>
>(({ ...props }, ref) => {
  const fileClasses =
    'file:outline-none file:border-none file:bg-emerald-600 file:px-1.5 file:py-1 file:rounded-sm file:text-slate-100 file:hover:bg-emerald-700 file:active:bg-emerald-700 file:transition-colors file:duration-300 file:cursor-pointer file:ml-3';

  return (
    <input
      type='file'
      ref={ref}
      {...props}
      className={`outline-none rounded-md border-none px-1.5 py-2 text-base text-slate-700 ${fileClasses}`}
    />
  );
});

export default FileInput;
