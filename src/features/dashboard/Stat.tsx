import { ReactNode } from 'react';

export default function Stat({
  icon,
  title,
  value,
  iconStyle,
}: {
  icon: ReactNode;
  title: string;
  value?: number | string | null;
  iconStyle: string;
}) {
  return (
    <div className='bg-gray-50 flex items-center gap-4 p-2.5 text-md rounded-md dark:bg-gray-800 dark:text-slate-100'>
      <span className={`text-4xl rounded-full p-4 ${iconStyle}`}>{icon}</span>
      <div className='flex flex-col gap-2'>
        <h3 className='font-medium text-slate-500 dark:text-slate-400'>
          {title}
        </h3>
        <span className='font-bold self-center text-lg'>{value}</span>
      </div>
    </div>
  );
}
