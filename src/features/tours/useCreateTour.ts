import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditTour } from '../../services/apiTours';
import toast from 'react-hot-toast';
import {
  type TourRowInputsType,
  type TourRowType,
} from '../../../types/global';

export default function useCreateTour() {
  const queryClient = useQueryClient();

  const { isPending, mutate, reset } = useMutation<
    TourRowType[],
    Error,
    TourRowInputsType
  >({
    mutationFn: createEditTour,
    onError: () => {
      toast.error('تور ایجاد نشد، لطفا دوباره تلاش کنید');
    },

    onSuccess: () => {
      toast.success('تور با موفقیت ایجاد شد');

      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });

  return { isPending, mutate, reset };
}
