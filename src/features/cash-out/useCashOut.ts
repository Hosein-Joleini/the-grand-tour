import { useMutation } from '@tanstack/react-query';
import { cashOutBookingById } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useCashOut() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: cashOutBookingById,

    onSuccess: () => {
      toast.success('رزرو با موفقیت تسویه گردید');

      navigate('/bookings');
    },

    onError: () => {
      toast.error('متاسفانه رزرو تسویه نشد.');
    },
  });

  return { mutate, isPending };
}
