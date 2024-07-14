import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { type RecentBookingsType } from '../../../types/global';
import { formatNumberToFarsi } from '../../utils/helpers';
import Stat from './Stat';

export default function Stats({
  bookings,
}: {
  bookings?: RecentBookingsType[];
}) {
  const numOfBookings = bookings?.length;

  const totalSales = bookings?.reduce((acc, value) => {
    return acc + value.totalPrice;
  }, 0);

  const totalConfirmed = bookings?.reduce((acc, item) => {
    if (item.status === 'confirmed' || item.status === 'cash-out') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const totalConfirmedRates =
    totalConfirmed && numOfBookings
      ? Number(((totalConfirmed / numOfBookings) * 100).toFixed(1))
      : null;

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title='رزرو ها'
        value={formatNumberToFarsi(numOfBookings)}
        iconStyle='text-blue-600 bg-emerald-100 dark:bg-blue-700 dark:text-emerald-100'
      />

      <Stat
        icon={<HiOutlineBanknotes />}
        title='فروش (ریال)'
        value={formatNumberToFarsi(totalSales, true)}
        iconStyle='text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-700'
      />

      <Stat
        icon={<HiOutlineCalendarDays />}
        title='تایید شده ها'
        value={formatNumberToFarsi(totalConfirmed)}
        iconStyle='text-indigo-600 bg-indigo-100 dark:text-indigo-100 dark:bg-indigo-700'
      />

      <Stat
        icon={<HiOutlineChartBar />}
        title='نرخ تایید شده ها'
        value={`${formatNumberToFarsi(totalConfirmedRates)}%`}
        iconStyle='text-amber-700 bg-amber-100 dark:text-amber-100 dark:bg-amber-700'
      />
    </>
  );
}
