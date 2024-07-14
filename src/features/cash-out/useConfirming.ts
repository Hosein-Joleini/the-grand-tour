import { useMutation } from '@tanstack/react-query';
import { updateBookingById } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useConfirming() {
  const navigate = useNavigate();

  const {
    isPending,
    isSuccess,
    mutate: updateBooking,
  } = useMutation({
    mutationFn: updateBookingById,
    onSuccess: () => {
      toast.success(`رزرو با موفقیت تایید شد.`);
      navigate('/');
    },

    onError: () => {
      toast.error('متاسفانه رزرو تایید نشد.');
    },
  });

  return { updateBooking, isPending, isSuccess };
}
