import { PropsWithChildren } from 'react';

export default function FormRow({
  label,
  htmlFor,
  children,
  error,
}: PropsWithChildren & {
  label: string;
  htmlFor: string;
  error?: string;
}) {
  return (
    <div className='grid grid-cols-[12rem_1fr_1fr] items-center justify-start py-4 gap-x-12'>
      <label htmlFor={htmlFor} className='font-medium text-slte-700'>
        {label}
      </label>
      {children}
      <span className='text-md text-rose-500'>{error}</span>
    </div>
  );
}
