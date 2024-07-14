import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../services/apiAuthentication';
import { SignUpInputsType } from '../../../types/global';
import toast from 'react-hot-toast';

export default function useSignUpUser() {
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = useMutation<
    void,
    Error,
    SignUpInputsType
  >({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success('کاربر جدید با موفقیت ساخته شد');
      toast.success('لطفا از طریق ایمیل خود حسابتان را تایید کنید');
      navigate('/login', { replace: true });
    },

    onError: () => {
      toast.error('متاسفانه کاربر جدید ساخته نشد');
    },
  });

  return { mutate, isPending, isSuccess };
}
