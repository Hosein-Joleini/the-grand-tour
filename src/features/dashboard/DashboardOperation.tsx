import FilterBy from '../../ui/FilterBy';

export default function DashboardOperation() {
  const filterOptions = [
    { label: 'یک هفته اخیر', value: '7' },
    { label: 'یک ماه اخیر', value: '30' },
    { label: 'سه ماه اخیر', value: '90' },
  ];

  return <FilterBy field='last' options={filterOptions} />;
}
