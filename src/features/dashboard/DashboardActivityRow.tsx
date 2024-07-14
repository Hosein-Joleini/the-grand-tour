import { TodayActivityType } from '../../../types/global';
import Table from '../../ui/Table';
import { formatCurrency, formatNumberToFarsi } from '../../utils/helpers';

export default function DashboardActivityRow({
  tourName,
  maxCapacity,
  tourPrice,
  location,
  numOfBookings,
}: TodayActivityType) {
  return (
    <Table.Row>
      <div></div>
      <div className='font-semibold py-2'>{tourName!}</div>
      <div className='font-semibold'>{location!}</div>
      <div className='font-semibold'>{formatCurrency(tourPrice!)}</div>
      <div>
        <strong>{formatNumberToFarsi(numOfBookings!)}</strong> نفر
      </div>
      <div>
        <strong>{formatNumberToFarsi(maxCapacity!)}</strong> نفر
      </div>
    </Table.Row>
  );
}
