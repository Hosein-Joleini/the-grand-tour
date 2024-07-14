import { Outlet } from 'react-router-dom';

import MainNavigation from './MainNavigation';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className='grid grid-cols-[260px_1fr] h-screen overflow-auto dark:bg-gray-800 dark:text-slate-50'>
      <MainNavigation />
      <div className='grid grid-rows-[min-content_1fr]'>
        <Header />
        <main className='overflow-auto bg-gray-100 p-12 dark:bg-gray-900 dark:text-slate-50'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
