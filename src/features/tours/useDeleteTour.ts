import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTourById } from '../../services/apiTours';
import toast from 'react-hot-toast';

export default function useDeleteTour() {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending } = useMutation<void, Error, number>({
    mutationFn: deleteTourById,
    onSuccess: () => {
      toast.success('تور با موفقیت حذف گردید');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: () => {
      toast.error('تور حذف نشد. لطفا دوباره تلاش کنید');
    },
  });

  return { mutate, isSuccess, isPending };
}
