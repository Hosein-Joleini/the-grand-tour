import { NavLink } from 'react-router-dom';

import Logo from './Logo';
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineUsers,
} from 'react-icons/hi2';

export default function MainNavigation() {
  const navLinkClasses =
    'flex items-center rounded-md gap-4 text-2xl py-3 px-6 hover:bg-emerald-50 hover:text-slate-900 transition-all duration-200 text-slate-700 dark:text-slate-50 dark:hover:bg-gray-900 dark:hover:text-slate-50';

  return (
    <div className='pt-8 border-l border-l-gray-200 dark:border-l-gray-700'>
      <Logo />
      <ul className='flex flex-col gap-2 px-6 py-2'>
        <li>
          <NavLink to='dashboard' className={navLinkClasses}>
            <HiOutlineHome />
            <span>خانه</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='bookings' className={navLinkClasses}>
            <HiOutlineCalendarDays />
            <span>رزرو ها</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='tours' className={navLinkClasses}>
            <HiOutlineMap />
            <span>تور ها</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='users' className={navLinkClasses}>
            <HiOutlineUsers />
            <span>کاربران</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='settings' className={navLinkClasses}>
            <HiOutlineCog6Tooth />
            <span>تنظیمات</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
