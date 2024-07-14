import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../services/apiAuthentication';
import { LoginInputsType } from '../../../types/global';
import {
  type Session,
  type User,
  type WeakPassword,
} from '@supabase/supabase-js';
import toast from 'react-hot-toast';

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    | {
        user: User;
        session: Session;
        weakPassword?: WeakPassword;
      }
    | {
        user: null;
        session: null;
        weakPassword?: null;
      },
    Error,
    LoginInputsType
  >({
    mutationFn: loginUser,

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('شما با موفقیت وارد شدید.');
      navigate('/dashboard', { replace: true });
    },

    onError: () => {
      toast.error('ایمیل یا کلمه عبور ارائه شده صحیح نیست.');
    },
  });

  return { mutate, isPending };
}
