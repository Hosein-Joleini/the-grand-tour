import { eachDayOfInterval, isSameDay, subDays } from 'date-fns';
import { type RecentBookingsType } from '../../../types/global';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';

export default function DashboardChart({
  bookings,
  numDays,
}: {
  bookings?: RecentBookingsType[];
  numDays: number;
}) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('fa-IR', {
      day: '2-digit',
      month: 'long',
    }).format(date);

  const data = allDates.map((date) => ({
    label: formatDate(date),

    totalSales: bookings
      ?.filter((item) => isSameDay(item.tours.startDate, date))
      .reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0),

    extrasSales: bookings
      ?.filter((item) => isSameDay(item.tours.startDate, date))
      .reduce((acc, item) => {
        return acc + item.extrasPrice;
      }, 0),
  }));

  const colors = isDarkMode
    ? {
        totalSales: { fill: '#16a34a', stroke: '#22c55e' },
        extrasSales: { fill: '#0891b2', stroke: '#06b6d4' },
        background: '#1f2937',
        text: '#f8fafc',
      }
    : {
        totalSales: { fill: '#16a34a', stroke: '#15803d' },
        extrasSales: { fill: '#0891b2', stroke: '#0e7490' },
        background: '#fff',
        text: '#1e293b',
      };

  const formatter = (value: number) =>
    new Intl.NumberFormat('fa-IR').format(value);

  return (
    <div
      dir='ltr'
      className='col-span-full bg-gray-50 rounded-md dark:bg-gray-800'
    >
      <h2 dir='rtl' className='px-8 pt-8 text-2xl font-semibold'>
        فروش از {data[0].label} تا {data[data.length - 1].label}
      </h2>

      <ResponsiveContainer width='100%' height={400}>
        <AreaChart
          width={300}
          height={300}
          data={data}
          margin={{ top: 40, right: 60, bottom: 25, left: 80 }}
        >
          <CartesianGrid strokeDasharray='4' />
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='ريال '
            tickFormatter={formatter}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              color: colors.text,
              direction: 'rtl',
              fontWeight: '600',
            }}
            formatter={formatter}
          />
          <Area
            type='monotone'
            dataKey='totalSales'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            name='فروش کل'
            unit=' ريال'
            strokeWidth='2'
          />
          <Area
            type='monotone'
            dataKey='extrasSales'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name='فروش اضافی'
            unit=' ريال'
            strokeWidth='2'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
