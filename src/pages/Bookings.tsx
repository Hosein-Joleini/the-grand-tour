import BookingsOperation from '../features/bookings/BookingsOperation';
import BookingsTable from '../features/bookings/BookingsTable';
import Row from '../ui/Row';

export default function Bookings() {
  return (
    <section>
      <Row type='horizontal'>
        <h1 className='text-3xl font-bold'>همه رزرو ها</h1>
        <BookingsOperation />
      </Row>
      <Row type='vertical'>
        <BookingsTable />
      </Row>
    </section>
  );
}
