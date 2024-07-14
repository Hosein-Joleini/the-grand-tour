import Button from './Button';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
}) {
  return (
    <section className='h-dvh flex flex-col justify-center items-center bg-gray-50 p-16 dark:bg-gray-900'>
      <h1 className='text-2xl font-semibold mb-4'>مشکلی پیش آمده!</h1>
      <p className='mb-8 text-sm font-normal'>{error?.message}</p>

      <Button btnType='primary' onClick={resetErrorBoundary}>
        تلاش دوباره
      </Button>
    </section>
  );
}
