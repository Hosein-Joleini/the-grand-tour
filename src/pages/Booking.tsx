import { useNavigate, useParams } from 'react-router-dom';
import Row from '../ui/Row';
import { formatNumberToFarsi } from '../utils/helpers';
import useBooking from '../features/bookings/useBooking';
import BookingDetail from '../features/bookings/BookingDetail';
import Tag from '../ui/Tag';
import { HiArrowLongRight } from 'react-icons/hi2';
import Loader from '../ui/Loader';
import useMoveBack from '../hooks/useMoveBack';
import Button from '../ui/Button';
import useDeleteBooking from '../features/bookings/useDeleteBooking';
import useCashOut from '../features/cash-out/useCashOut';

export default function Booking() {
  const navigate = useNavigate();
  const params = useParams();
  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking();
  const { mutate: cashOutBooking, isPending: isCashingOut } = useCashOut();

  const moveBack = useMoveBack();

  const bookingId = Number(params.bookingId);
  const { booking, isLoading } = useBooking(bookingId);

  if (isLoading) return <Loader />;

  return (
    <section>
      <Row type='horizontal'>
        <div className='flex items-center gap-4'>
          <h1 className='font-bold text-5xl'>
            رزرو {formatNumberToFarsi(bookingId)}#
          </h1>
          <Tag status={booking?.status} />
        </div>
        <button
          className='flex items-center gap-2 text-xl text-emerald-600'
          onClick={moveBack}
        >
          <HiArrowLongRight />
          <span>بازگشت</span>
        </button>
      </Row>
      <BookingDetail booking={booking} />
      <div className='mt-8 flex items-center gap-4 justify-end'>
        {booking?.status === 'unconfirmed' && (
          <Button
            btnType='primary'
            onClick={() => navigate(`/confirm/${bookingId}`)}
          >
            تایید رزرو
          </Button>
        )}
        {booking.status === 'confirmed' && (
          <Button
            btnType='primary'
            onClick={() => {
              cashOutBooking({ id: bookingId, status: 'cash-out' });
            }}
            disabled={isCashingOut}
          >
            تسویه رزرو
          </Button>
        )}
        <Button
          btnType='delete'
          onClick={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        >
          حذف رزرو
        </Button>
        <Button btnType='secondary' onClick={moveBack}>
          بازگشت
        </Button>
      </div>
    </section>
  );
}
