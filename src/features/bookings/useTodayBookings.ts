import { useQuery } from '@tanstack/react-query';
import { getTodayBookings } from '../../services/apiBookings';
import { TodayActivityType, TodayBookingsType } from '../../../types/global';

export default function useTodayBooking() {
  const { data, isLoading } = useQuery<TodayBookingsType[]>({
    queryKey: ['today'],
    queryFn: getTodayBookings,
  });

  const todayBookings = data?.reduce((acc, item: TodayBookingsType) => {
    const existingTour = acc?.find((obj) => obj.tourId === item.tours.id);

    if (existingTour) {
      if (item.isPaid) existingTour.numOfBookings++;
    } else {
      const newBooking = {
        id: item.id,
        tourId: item.tours.id,
        tourName: item.tours.tourName,
        maxCapacity: item.tours.maxCapacity,
        imageUrl: item.tours.imageUrl,
        tourPrice: item.tours.regularPrice,
        location: item.tours.location,
        numOfBookings: item.isPaid ? 1 : 0,
      };

      acc.push(newBooking);
    }

    return acc;
  }, [] as TodayActivityType[]);

  return { todayBookings, isLoading };
}
