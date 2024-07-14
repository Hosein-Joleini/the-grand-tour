export const formatCurrency = (value?: number | null) => {
  return (
    value &&
    new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
    }).format(value)
  );
};

export const formatNumberToFarsi = (
  number?: number | null,
  grouping = false
) => {
  return (
    number &&
    new Intl.NumberFormat('fa-IR', { useGrouping: grouping }).format(number)
  );
};

export const formatDateToFarsi = (date: string) => {
  const reachedDate = new Date(date);
  return new Intl.DateTimeFormat('fa-IR').format(reachedDate);
};

export const formatDateToJalali = (date?: string | null) => {
  const reachedDate = date && new Date(date);
  return reachedDate
    ? new Intl.DateTimeFormat('fa-IR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(reachedDate)
    : null;
};
