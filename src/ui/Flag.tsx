export default function Flag({ flagUrl }: { flagUrl?: string | null }) {
  if (flagUrl)
    return (
      <img
        src={flagUrl}
        alt='پرچم'
        className='w-6 h-4 object-cover object-center'
      />
    );

  return null;
}
