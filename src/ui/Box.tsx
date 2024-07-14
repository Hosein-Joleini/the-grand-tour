import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { formatCurrency } from '../utils/helpers';

export default function Box({
  isPaid,
  totalPrice,
  hasMeals,
  tourPrice,
  extrasPrice,
}: {
  isPaid?: boolean | null;
  hasMeals?: boolean | null;
  totalPrice?: number | null;
  tourPrice?: number | null;
  extrasPrice?: number | null;
}) {
  return (
    <div
      className={`mt-4 py-7 px-8 ${
        isPaid
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-orange-100 text-orange-800'
      } rounded-md text-xl flex justify-between items-center`}
    >
      <div className='flex items-center gap-2 text-base'>
        <span className='text-2xl'>
          <HiOutlineCurrencyDollar />
        </span>
        <span>میزان کل پرداختی</span>
        <span>{formatCurrency(totalPrice)}</span>
        {hasMeals && (
          <span>
            ({formatCurrency(tourPrice)} تور + {formatCurrency(extrasPrice)}{' '}
            وعده های غذایی)
          </span>
        )}
      </div>
      <div className='text-base'>
        {isPaid ? 'پرداخت شده' : 'هنوز پرداخت نشده'}
      </div>
    </div>
  );
}
