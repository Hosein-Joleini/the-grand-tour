import { useSearchParams } from 'react-router-dom';
import Loader from '../../ui/Loader';
import useRecentBookings from '../bookings/useRecentBookings';
import DashboardActivity from './DashboardActivity';
import DashboardChart from './DashboardChart';
import Stats from './Stats';

export default function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const { recentBookings, isLoading } = useRecentBookings();
  const numDays = Number(searchParams.get('last') || '7');

  if (isLoading) return <Loader />;

  return (
    <div className='grid grid-cols-4 grid-rows-[auto_22rem_1fr] gap-8'>
      <Stats bookings={recentBookings} />
      <DashboardActivity />
      <DashboardChart bookings={recentBookings} numDays={numDays} />
    </div>
  );
}
