import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import MiniSpinner from './MiniSpinner';

type Button = {
  children: ReactNode;
  btnType: 'small' | 'primary' | 'secondary' | 'menu' | 'delete' | 'login';
  isPending?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export default function Button({
  children,
  btnType,
  isPending,
  ...props
}: Button) {
  const btnClassNames = {
    small:
      'text-2xl outline-none border-none justify-self-center flex items-center justify-center hover:bg-gray-200 rounded-sm focus:bg-gray-200 foucs:outline-4 focus:outline-emerald-500 transition-all duration-300 disabled:cursor-not-allowed dark:hover:bg-gray-700 dark:focus:bg-gray-700',
    primary:
      'outline-none text-center bg-emerald-600 px-4 py-2 rounded-md text-slate-100 hover:bg-emerald-700 active:bg-emerald-700 transition-colors shadow shadow-gray-900/25 duration-300 text-lg flex gap-2 items-center disabled:cursor-not-allowed',
    secondary:
      'outline-none border border-gray-300 px-4 py-2 rounded-md text-lg bg-transparent hove:bg-gray-100 transition-all duration-300 disabled:cursor-not-allowed dark:text-slate-100',
    menu: 'flex items-center justify-between w-full gap-10 outline-none border-none py-2 px-4 disabled:cursor-not-allowed',
    delete:
      'outline-none bg-red-700 px-4 py-2 rounded-md text-slate-100 hover:bg-red-800 active:bg-red-700 transition-colors shadow shadow-gray-900/25 duration-300 text-lg flex gap-2 items-center disabled:cursor-not-allowed',
    login:
      'outline-none text-center bg-emerald-600 px-4 py-2 rounded-md text-slate-100 hover:bg-emerald-700 active:bg-emerald-700 transition-colors shadow shadow-gray-900/25 duration-300 text-lg disabled:cursor-not-allowed w-full',
  };

  return (
    <button className={btnClassNames[btnType]} {...props}>
      {children}
      {isPending && <MiniSpinner />}
    </button>
  );
}
