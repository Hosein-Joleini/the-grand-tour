import { format, formatDate, subDays } from 'date-fns';
import {
  type RecentBookingsType,
  type UpdateBooking,
  type BookingTableType,
  type TodayBookingsType,
} from '../../types/global';
import { ITEMS_PER_PAGE } from '../utils/constants';
import supabase from './supabase';

export async function getBookings(
  filter: string | null,
  sortBy: string | null,
  page: number | null
) {
  let queryData;

  const query = supabase
    .from('bookings')
    .select(
      'id,status, totalPrice,  tours (id, tourName, startDate), guests (fullName, phoneNumber, id)',
      { count: 'exact' }
    );

  // FILTER
  if (!filter || filter === 'all') {
    queryData = await query;
  }

  if (filter && filter !== 'all') {
    queryData = await query.eq('status', filter);
  }

  // SORT
  const [field, direction] = sortBy?.split('-') || ['totalPrice', 'asc'];

  const ascendingOrDescending = direction === 'asc' ? true : false;

  if (field === 'totalPrice') {
    queryData = await query.order(field, {
      ascending: ascendingOrDescending,
    });
  }

  if (field === 'startDate') {
    queryData = await query.order(`tours(${field})`, {
      ascending: ascendingOrDescending,
    });
  }

  // PAGINATION
  const numberOfPage = page || 1;
  const startIndex = (numberOfPage - 1) * ITEMS_PER_PAGE;
  const endIndex =
    queryData?.count && numberOfPage * ITEMS_PER_PAGE - 1 > queryData?.count
      ? queryData?.count
      : numberOfPage * ITEMS_PER_PAGE - 1;

  queryData = await query.range(startIndex, endIndex);

  const { data, error, count } = queryData;

  const bookings = data as BookingTableType;

  if (error) {
    console.log(error);

    throw new Error('فادر به بارگذاری رزرو ها نیستیم. لطفا دوباره تلاش کنید.');
  }

  return { bookings, count };
}

export async function deleteBookingById(id: number) {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.log(error);

    throw new Error('رزرو مورد نظر شما حذف نشد. لطفا دوباره تلاش کنید.');
  }
}

export async function getBookingById(id: number) {
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*, tours(tourName, startDate, endDate), guests(*)')
    .eq('id', id);

  if (error) {
    console.log(error);

    throw new Error(
      'قادر به بارگذاری رزرو مورد نظر شما نیستیم. دوباره تلاش کنید.'
    );
  }

  return booking[0];
}

export async function updateBookingById(obj: UpdateBooking) {
  const { error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', obj.id)
    .select();

  if (error) {
    console.log(error);

    throw new Error('در تایید رزرو مشکلی پیش آمد. دوباره تلاش کنید.');
  }
}

export async function cashOutBookingById(obj: { id: number; status: string }) {
  const { error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', obj.id)
    .select();

  if (error) {
    console.log(error);

    throw new Error('در تایید رزرو مشکلی پیش آمد. دوباره تلاش کنید.');
  }
}

export async function getRecentBookings(last: number) {
  const now = Date.now();

  const endDate = formatDate(now, 'yyyy-MM-dd');
  const startDate = format(subDays(endDate, last + 1), 'yyyy-MM-dd');

  const { data, error } = await supabase
    .from('bookings')
    .select(
      'totalPrice, tourPrice, extrasPrice, numGuests, status, id, isPaid, tourId, tours(startDate, tourName, maxCapacity)'
    )
    .gte('tours.startDate', startDate)
    .lte('tours.startDate', endDate);

  if (error) {
    console.log(error);
  }

  const bookings =
    data &&
    data
      .filter((item) => item.tours)
      .map((item) => ({
        ...item,
        tours: Array.isArray(item.tours) ? item.tours[0] : item.tours,
      }));

  return bookings as RecentBookingsType[];
}

export async function getTodayBookings() {
  const now = format(Date.now(), 'yyyy-MM-dd');

  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, status, isPaid, tours(tourName, id, imageUrl, maxCapacity, location, regularPrice)'
    )
    .eq('tours.startDate', now);

  if (error) {
    console.log(error);

    throw new Error('قادر به بارگذاری فعالیت روزانه نیستیم. دوباره تلاش کنید.');
  }

  const bookings =
    data &&
    data
      .filter((item) => item.tours)
      .map((item) => ({
        ...item,
        tours: Array.isArray(item.tours) ? item.tours[0] : item.tours,
      }));

  return bookings as TodayBookingsType[];
}
