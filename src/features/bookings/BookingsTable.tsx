import { BookingRowType } from '../../../types/global';
import Loader from '../../ui/Loader';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
import useBookings from './useBookings';

export default function BookingsTable() {
  const {
    bookings,
    isLoading,
    error: bookingsError,
    itemsCount,
  } = useBookings();

  if (isLoading) return <Loader />;

  return (
    <Menus>
      <Table columns='grid-cols-[0.01fr_1fr_1.3fr_1.1fr_1fr_1fr_0.3fr]'>
        <Table.Header>
          <div></div>
          <div>نام تور</div>
          <div>نام میهمان</div>
          <div>تاریخ شروع تور</div>
          <div>وضعیت پرداخت</div>
          <div>میزان پرداختی</div>
          <div></div>
        </Table.Header>

        <Table.Body
          error={bookingsError}
          data={bookings as BookingRowType[]}
          render={(booking: BookingRowType) => (
            <BookingRow bookings={booking} key={booking.id} />
          )}
        />
      </Table>
      <Pagination totalItems={itemsCount} />
    </Menus>
  );
}
