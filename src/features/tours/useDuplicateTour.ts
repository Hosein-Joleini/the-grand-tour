import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type CreatedTourType } from '../../../types/global';
import { duplicateTour } from '../../services/apiTours';
import toast from 'react-hot-toast';

export default function useDuplicateTour() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<void, Error, CreatedTourType>({
    mutationFn: duplicateTour,

    onSuccess: () => {
      toast.success('کپی از تور با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },

    onError: () => {
      toast.error('کپی از تور ایجاد نشد');
    },
  });

  return { mutate, isPending };
}
