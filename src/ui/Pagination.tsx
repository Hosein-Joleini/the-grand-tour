import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import { formatNumberToFarsi } from '../utils/helpers';
import { useSearchParams } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../utils/constants';

export default function Pagination({
  totalItems,
}: {
  totalItems?: number | null;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const numberOfPages = Math.ceil(totalItems! / ITEMS_PER_PAGE);
  const currentPage = Number(searchParams.get('page') || '1');

  const startIndex = ITEMS_PER_PAGE * (currentPage - 1) + 1;
  const endIndex =
    currentPage === numberOfPages ? totalItems : ITEMS_PER_PAGE * currentPage;

  function handlePrevious() {
    if (currentPage > 1) {
      searchParams.set('page', currentPage - 1 + '');
      setSearchParams(searchParams);
    }
  }

  function handleNext() {
    searchParams.set('page', currentPage + 1 + '');
    setSearchParams(searchParams);
  }

  if (totalItems! <= ITEMS_PER_PAGE) return null;

  return (
    <div className='mt-6 flex items-center justify-between'>
      <div>
        نمایش <strong>{formatNumberToFarsi(startIndex)}</strong> تا{' '}
        <strong>{formatNumberToFarsi(endIndex!)}</strong> از{' '}
        <strong>{formatNumberToFarsi(totalItems!)}</strong> نتیجه
      </div>
      <div className='flex items-center gap-2'>
        <button
          className='pl-3 pr-1 py-1 flex items-center gap-1 text-lg hover:bg-emerald-600 hover:text-slate-50 transition-colors duration-300 rounded-md text-center disabled:cursor-not-allowed disabled:bg-transparent disabled:text-slate-800 dark:disabled:text-slate-500'
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <HiOutlineChevronRight />
          <span className='text-base'>قبل</span>
        </button>
        <button
          className='pl-1 pr-3 py-1 flex items-center gap-1 text-lg hover:bg-emerald-600 hover:text-slate-50 transition-colors duration-300 rounded-md text-center disabled:bg-transparent disabled:text-slate-800 disabled:cursor-not-allowed'
          onClick={handleNext}
          disabled={currentPage === numberOfPages}
        >
          <span className='text-base'>بعد</span>
          <HiOutlineChevronLeft />
        </button>
      </div>
    </div>
  );
}
