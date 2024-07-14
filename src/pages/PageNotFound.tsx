import useMoveBack from '../hooks/useMoveBack';
import Button from '../ui/Button';

export default function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <section className='h-dvh flex flex-col justify-center items-center bg-gray-50 p-16 dark:bg-gray-900'>
      <h1 className='text-2xl font-semibold mb-8'>
        صفحه مورد نظر شما یافت نشد.
      </h1>

      <Button btnType='secondary' onClick={moveBack}>
        بازگشت &larr;
      </Button>
    </section>
  );
}
