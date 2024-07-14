export default function Tag({ status }: { status?: string | null }) {
  const statusLabel =
    status === 'confirmed'
      ? 'تایید شده'
      : status === 'unconfirmed'
      ? 'تایید نشده'
      : 'تسویه شده';

  const tagClassName =
    status === 'confirmed'
      ? 'bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-slate-50'
      : status === 'unconfirmed'
      ? 'bg-gray-200 dark:bg-gray-600 dark:text-slate-50'
      : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-600 dark:text-slate-50';

  return (
    <span
      className={`py-0.5 px-3.5 rounded-full text-center ${tagClassName} font-medium`}
    >
      {statusLabel}
    </span>
  );
}
