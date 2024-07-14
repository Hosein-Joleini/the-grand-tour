import FilterBy from '../../ui/FilterBy';
import SortBy from '../../ui/SortBy';

export default function ToursOperation() {
  const filterOptions = [
    { label: 'همه', value: 'all' },
    { label: 'بدون تخفیف', value: 'no-discount' },
    { label: 'با تخفیف', value: 'with-discount' },
  ];

  const sortOptions = [
    { label: 'مرتب سازی بر اساس نام (الف-ی)', value: 'name-asc' },
    { label: 'مرتب سازی بر اساس نام (ی-الف)', value: 'name-desc' },
    { label: 'مرتب سازی بر اساس قیمت (صعودی)', value: 'regularPrice-asc' },
    { label: 'مرتب سازی بر اساس قیمت (نزولی)', value: 'regularPrice-desc' },
    { label: 'مرتب سازی بر اساس تاریخ (صعودی)', value: 'startDate-asc' },
    { label: 'مرتب سازی بر اساس تاریخ (نزولی)', value: 'startDate-desc' },
  ];

  return (
    <div className='flex items-center gap-4'>
      <FilterBy options={filterOptions} field='discount' />
      <SortBy field='sortBy' options={sortOptions} />
    </div>
  );
}
