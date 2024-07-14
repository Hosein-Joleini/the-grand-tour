import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMoveBack from '../../hooks/useMoveBack';
import useBooking from '../bookings/useBooking';
import Loader from '../../ui/Loader';
import Row from '../../ui/Row';
import { formatCurrency, formatNumberToFarsi } from '../../utils/helpers';
import Tag from '../../ui/Tag';
import { HiArrowLongRight } from 'react-icons/hi2';
import BookingDetail from '../bookings/BookingDetail';
import Button from '../../ui/Button';
import CheckBox from '../../ui/ChechBox';
import { differenceInDays } from 'date-fns';
import useSettings from '../settings/useSettings';
import useConfirming from './useConfirming';

export default function ConfirmBooking() {
  const moveBack = useMoveBack();
  const params = useParams();
  const confirmId = Number(params.confirmId);
  const { booking, isLoading } = useBooking(confirmId);
  const { settings, isLoading: isSettingLoading } = useSettings();
  const { updateBooking } = useConfirming();
  const [hasCheckedMeals, setHasCheckedMeals] = useState(
    () => booking?.hasMeals
  );
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const diffrenceDates =
    booking?.tours.startDate && booking?.tours.endDate
      ? differenceInDays(booking?.tours.endDate, booking?.tours.startDate) + 1
      : 0;

  useEffect(() => {
    setHasConfirmed(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  function handleConfirming() {
    if (!hasConfirmed) return;

    if (hasCheckedMeals) {
      updateBooking({
        id: booking.id,
        hasMeals: hasCheckedMeals,
        isPaid: true,
        status: 'confirmed',
        extrasPrice: hasCheckedMeals ? optionalMeals : null,
        totalPrice: hasCheckedMeals
          ? booking.tourPrice! + optionalMeals
          : booking.tourPrice,
      });
    } else {
      updateBooking({
        id: booking.id,
        hasMeals: booking.hasMeals,
        isPaid: true,
        status: 'confirmed',
        extrasPrice: booking.extrasPrice,
        totalPrice: booking.tourPrice! + booking.extrasPrice!,
      });
    }
  }

  if (isLoading || isSettingLoading) return <Loader />;

  const optionalMeals =
    ((booking.numGuests ?? 0) + 1) *
    (settings?.mealsPrice ?? 0) *
    diffrenceDates;

  return (
    <section>
      <Row type='horizontal'>
        <div className='flex items-center gap-4'>
          <h2 className='font-semibold text-5xl'>
            تایید رزرو {formatNumberToFarsi(confirmId)}#
          </h2>
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
      {booking.status === 'unconfirmed' ? (
        <div className='my-8 flex flex-col gap-8'>
          {!booking.hasMeals && (
            <CheckBox
              id='meals'
              checked={hasCheckedMeals || false}
              onChange={() => setHasCheckedMeals((prevState) => !prevState)}
            >
              تمایل به داشتن وعده غذایی به قیمت ({formatCurrency(optionalMeals)}
              )؟
            </CheckBox>
          )}

          <CheckBox
            id='confirming'
            checked={hasConfirmed || false}
            onChange={() => setHasConfirmed((prevState) => !prevState)}
            disabled={hasConfirmed}
          >
            من تایید میکنم که {booking?.guests.fullName} هزینه{'  '}
            {hasCheckedMeals
              ? formatCurrency(
                  booking.extrasPrice
                    ? booking.totalPrice
                    : booking.tourPrice! + optionalMeals
                )
              : formatCurrency(booking.totalPrice)}{' '}
            {hasCheckedMeals
              ? `(${formatCurrency(
                  booking.extrasPrice ? booking.extrasPrice : optionalMeals
                )} + ${formatCurrency(booking.tourPrice)})`
              : null}{' '}
            پرداخت کرده است.
          </CheckBox>
        </div>
      ) : null}
      <div className='mt-8 flex items-center gap-4 justify-end'>
        {booking?.status === 'unconfirmed' && (
          <Button
            btnType='primary'
            disabled={!hasConfirmed}
            onClick={handleConfirming}
          >
            تایید رزرو {formatNumberToFarsi(confirmId)}#
          </Button>
        )}

        <Button btnType='secondary' onClick={moveBack}>
          بازگشت
        </Button>
      </div>
    </section>
  );
}
