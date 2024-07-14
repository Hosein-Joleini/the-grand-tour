import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { type LoginInputsType } from '../../../types/global';
import MiniSpinner from '../../ui/MiniSpinner';
import useLogin from './useLogin';

export default function LoginForm() {
  const { isPending: isLogin, mutate: login } = useLogin();
  const { register, handleSubmit } = useForm<LoginInputsType>();

  function onSubmit({ email, password }: LoginInputsType) {
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-gray-50 rounded-lg p-8 w-96 dark:bg-gray-800'>
        <div className='flex flex-col flex-1 mb-6'>
          <label htmlFor='email' className='text-lg font-medium mb-2'>
            آدرس ایمیل
          </label>
          <Input
            id='email'
            type='email'
            required
            {...register('email', {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'لطفا ایمیل معتبر وارد کنید',
              },
            })}
          />
        </div>
        <div className='flex flex-col flex-1 mb-6'>
          <label htmlFor='password' className='text-lg font-medium mb-2'>
            کلمه عبور
          </label>
          <Input
            required
            id='password'
            type='password'
            {...register('password')}
          />
        </div>
        <div className='pb-4'>
          <Button btnType='login' type='submit'>
            {isLogin ? <MiniSpinner /> : 'ورود'}
          </Button>
        </div>
      </div>
    </form>
  );
}
