import { useQuery } from '@tanstack/react-query';
import { getTours } from '../../services/apiTours';
import { TourRowType } from '../../../types/global';

export default function useTours() {
  const {
    data: tours,
    isLoading,
    error,
  } = useQuery<TourRowType[]>({
    queryKey: ['tours'],
    queryFn: getTours,
  });

  return { tours, isLoading, error };
}
