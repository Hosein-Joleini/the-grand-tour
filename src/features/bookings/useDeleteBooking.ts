import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookingById } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useDeleteBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation<void, Error, number>({
    mutationFn: deleteBookingById,
    onSuccess: () => {
      toast.success('رزرو با موفقیت حذف شد');

      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate('/bookings');
    },
    onError: () => {
      toast.error('مشکلی در حذف رزرو بوجود آمد. لطفا دوباره تلاش کنید');
    },
  });

  return { mutate, isPending, isSuccess };
}
