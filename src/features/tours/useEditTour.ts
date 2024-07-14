import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditTour } from '../../services/apiTours';
import { TourRowInputsType, TourRowType } from '../../../types/global';
import toast from 'react-hot-toast';

export default function useEditTour() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    TourRowType[],
    Error,
    TourRowInputsType
  >({
    mutationFn: createEditTour,
    onError: () => {
      toast.error('تور اصلاح نشد، لطفا دوباره تلاش کنید');
    },

    onSuccess: () => {
      toast.success('تور با موفقیت اصلاح شد');

      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });

  return { mutate, isPending };
}
