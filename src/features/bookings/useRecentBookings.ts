import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getRecentBookings } from '../../services/apiBookings';
import { type RecentBookingsType } from '../../../types/global';

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const last = Number(searchParams.get('last') || '7');

  const { data: recentBookings, isLoading } = useQuery<RecentBookingsType[]>({
    queryKey: ['bookings', `last-${last}`],
    queryFn: () => getRecentBookings(last),
  });

  return { recentBookings, isLoading };
}
