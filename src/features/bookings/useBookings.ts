import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { type BookingTableType } from '../../../types/global';
import { useSearchParams } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../utils/constants';

type FetchedData = {
  bookings: BookingTableType | undefined;
  count: number | null | undefined;
};

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get('status');
  const sortBy = searchParams.get('sortBy');
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { data, error, isLoading } = useQuery<FetchedData>({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  const bookings = data?.bookings as BookingTableType;
  const itemsCount = data?.count;

  const pageCount = Math.ceil(itemsCount! / ITEMS_PER_PAGE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  }

  return { bookings, isLoading, error, itemsCount };
}
