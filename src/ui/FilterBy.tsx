import { useSearchParams } from 'react-router-dom';

export default function FilterBy({
  field,
  options,
}: {
  field: string;
  options: { label: string; value: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(field) || options[0].value;

  function handleFilter(value: string) {
    searchParams.set(field, value);
    if (searchParams.get('page')) searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  return (
    <div className='flex items-center bg-gray-50 gap-1 p-1 rounded-md dark:bg-gray-800'>
      {options.map((option: { label: string; value: string }) => (
        <button
          className={`text-md font-medium outline-none border-none hover:bg-emerald-600 rounded-md focus:bg-emerald-600 ${
            currentFilter === option.value ? 'text-slate-50 bg-emerald-600' : ''
          } hover:text-slate-50 focus:text-slate-50 transition-all duration-300 py-1 px-2`}
          onClick={() => handleFilter(option.value)}
          key={option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
