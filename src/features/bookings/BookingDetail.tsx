import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineMap,
} from 'react-icons/hi2';
import { BookingDetailType } from '../../../types/global';
import { formatDateToJalali, formatNumberToFarsi } from '../../utils/helpers';
import Flag from '../../ui/Flag';
import Box from '../../ui/Box';

export default function BookingDetail({
  booking,
}: {
  booking?: BookingDetailType;
}) {
  const numberOfGuests = formatNumberToFarsi(booking?.numGuests);
  const nationalIdInFarsi = formatNumberToFarsi(
    Number(booking?.guests.nationalId)
  );

  return (
    <div className='flex flex-col bg-gray-50 rounded-lg overflow-hidden dark:bg-gray-800'>
      <div className='flex items-center justify-between bg-emerald-500 text-slate-50 text-2xl px-6 py-4'>
        <div className='flex items-center gap-4'>
          <HiOutlineMap />
          <h3>{booking?.tours.tourName}</h3>
        </div>
        <div>
          <h3>
            {formatDateToJalali(booking?.tours.startDate)} &mdash;{' '}
            {formatDateToJalali(booking?.tours.endDate)}
          </h3>
        </div>
      </div>
      <div className='py-8 px-10 flex flex-col'>
        <div className='flex flex-wrap items-center gap-4 text-lg'>
          <div>
            <Flag flagUrl={booking?.guests.countryFlag} />
          </div>
          <p className='font-semibold'>
            {booking?.guests.fullName} +{' '}
            {numberOfGuests ? numberOfGuests : 'بدون'} مهمان
          </p>
          <span className='text-slate-500 text-xl'>&bull;</span>
          <span className='text-slate-500'>کد ملی {nationalIdInFarsi}</span>
          <span className='text-slate-500 text-xl'>&bull;</span>
          <span className='text-slate-500'>{booking?.guests.email}</span>
          <span className='text-slate-500 text-xl'>&bull;</span>
          <span className='text-slate-500'>
            {formatNumberToFarsi(Number(booking?.guests.phoneNumber))}
          </span>
        </div>
        {booking?.observation && (
          <div className='flex items-center gap-4 mt-6'>
            <span className='text-xl'>
              <HiOutlineChatBubbleBottomCenterText />
            </span>
            <span className='text-lg font-medium'>مشاهدات</span>
            <p className='text-lg'>{booking.observation}</p>
          </div>
        )}
        <div className='flex items-center gap-4 mt-4'>
          <span className='text-xl'>
            <HiOutlineCheckCircle />
          </span>
          <span className='text-lg font-medium'>شامل وعده غذایی؟</span>
          <span>{booking?.hasMeals ? 'بله' : 'خیر'}</span>
        </div>
        <Box
          isPaid={booking?.isPaid}
          totalPrice={booking?.totalPrice}
          hasMeals={booking?.hasMeals}
          tourPrice={booking?.tourPrice}
          extrasPrice={booking?.extrasPrice}
        />
      </div>
    </div>
  );
}
