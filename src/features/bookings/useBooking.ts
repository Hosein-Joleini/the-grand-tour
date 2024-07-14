import { useQuery } from '@tanstack/react-query';
import { getBookingById } from '../../services/apiBookings';
import { BookingDetailType } from '../../../types/global';

export default function useBooking(id: number) {
  const { data, isLoading } = useQuery<BookingDetailType>({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
  });

  const booking = data as BookingDetailType;

  return { booking, isLoading };
}
