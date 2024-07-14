import { useSearchParams } from 'react-router-dom';

export default function SortBy({
  field,
  options,
}: {
  field: string;
  options: { label: string; value: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sortBy') || options[0].value;

  function handleSort(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set(field, event.target.value);
    if (searchParams.get('page')) searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  return (
    <select
      className='text-md font-medium px-2 h-10 outline-none bg-gray-50 border-none rounded-md dark:bg-gray-800 focus:ring-1 ring-emerald-600'
      onChange={handleSort}
      defaultValue={currentSort}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
