import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInformation } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';
import { User } from '@supabase/supabase-js';
import { UpdateUserType } from '../../../types/global';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation<
    { user: User },
    Error,
    UpdateUserType
  >({
    mutationFn: updateUserInformation,

    onSuccess: (user) => {
      toast.success('اطلاعات شما با موفقیت بروز شد');
      queryClient.setQueryData(['user'], user.user);
    },

    onError: () => {
      toast.error('متاسفانه اطلاعات شما بروز نشد.');
    },
  });

  return { mutate, isPending, isSuccess };
}
