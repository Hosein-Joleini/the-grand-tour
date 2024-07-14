import FilterBy from '../../ui/FilterBy';
import SortBy from '../../ui/SortBy';

export default function BookingsOperation() {
  const filterOptions = [
    { label: 'همه', value: 'all' },
    { label: 'تسویه شده', value: 'cash-out' },
    { label: 'تایید شده', value: 'confirmed' },
    { label: 'تایید نشده', value: 'unconfirmed' },
  ];

  const sortOptions = [
    {
      label: 'مرتب سازی بر اساس میزان پرداختی (صعودی)',
      value: 'totalPrice-asc',
    },
    {
      label: 'مرتب سازی بر اساس میزان پرداختی (نزولی)',
      value: 'totalPrice-desc',
    },
    {
      label: 'مرتب سازی بر اساس تاریخ شروع تور (صعودی)',
      value: 'startDate-asc',
    },
    {
      label: 'مرتب سازی بر اساس تاریخ شروع تور (نزولی)',
      value: 'startDate-desc',
    },
  ];

  return (
    <div className='flex items-center gap-4'>
      <FilterBy field='status' options={filterOptions} />
      <SortBy field='sortBy' options={sortOptions} />
    </div>
  );
}
