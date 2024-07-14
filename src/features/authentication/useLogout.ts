import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: isLogingOut } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      toast.success('شما با موفقیت خارج شدید');
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },

    onError: () => {
      toast.error('متاسفانه خارج نشدید');
    },
  });

  return { mutate, isLogingOut };
}
