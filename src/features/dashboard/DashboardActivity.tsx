import { type TodayActivityType } from '../../../types/global';
import Loader from '../../ui/Loader';
import Table from '../../ui/Table';
import useTodayBooking from '../bookings/useTodayBookings';
import DashboardActivityRow from './DashboardActivityRow';

export default function DashboardActivity() {
  const { todayBookings, isLoading } = useTodayBooking();

  if (isLoading) return <Loader />;

  return (
    <div className='bg-gray-50 col-span-full rounded-md p-8 overflow-y-scroll dark:bg-gray-800'>
      <h2 className='text-3xl font-semibold mb-12'>امروز</h2>
      {todayBookings?.length === 0 ? (
        <p className='text-xl font-medium text-center'>
          فعالیتی برای امروز موجود نیست ...
        </p>
      ) : (
        <Table columns='grid-cols-[0.1fr_1fr_1fr_1.1fr_0.9fr_0.9fr]'>
          <div className='bg-gray-100'>
            <Table.Header>
              <div></div>
              <div>نام تور</div>
              <div>مکان تور</div>
              <div>قیمت تور</div>
              <div>تعداد ثبت نام</div>
              <div>حداکثر ظرفیت</div>
            </Table.Header>
          </div>
          <Table.Body
            data={todayBookings as TodayActivityType[]}
            render={(item: TodayActivityType) => (
              <DashboardActivityRow {...item} key={item.id} />
            )}
          />
        </Table>
      )}
    </div>
  );
}
