import { type ValidateResult, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { formatNumberToFarsi } from '../../utils/helpers';
import { SignUpInputsType } from '../../../types/global';
import useSignUpUser from './useSignUpUser';

export default function SignUpForm() {
  const { mutate: signUp, isPending } = useSignUpUser();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SignUpInputsType>();

  function onSubmit({
    email,
    fullName,
    password,
    repeatedPassword,
  }: SignUpInputsType) {
    signUp(
      { email, fullName, password, repeatedPassword, avatar: '' },
      { onSettled: () => reset() }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='text-md bg-gray-50 rounded-md px-8 py-4 divide-y dark:bg-gray-800 dark:divide-gray-700'>
        <FormRow
          label='نام و نام خانوادگی'
          htmlFor='fullname'
          error={errors?.fullName?.message}
        >
          <Input
            id='fullname'
            type='text'
            {...register('fullName', {
              required: 'لطفا نام و نام خانوادگی خود را وارد کنید',
            })}
            disabled={isPending}
          />
        </FormRow>
        <FormRow
          label='آدرس ایمیل'
          htmlFor='email-address'
          error={errors?.email?.message}
        >
          <Input
            placeholder='test@test.com'
            disabled={isPending}
            id='email-address'
            type='email'
            {...register('email', {
              required: 'لطفا ایمیل خود را وارد کنید',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'لطفا ایمیل معتبر وارد کنید',
              },
            })}
          />
        </FormRow>

        <FormRow
          label={`کلمه عبور (حداقل ${formatNumberToFarsi(8)} کاراکتر)`}
          htmlFor='password'
          error={errors?.password?.message}
        >
          <Input
            id='password'
            disabled={isPending}
            type='password'
            {...register('password', {
              required: 'لطفا کلمه عبور خود را وارد کنید',
              minLength: {
                value: 8,
                message: `کلمه عبور باید حداقل ${formatNumberToFarsi(
                  8
                )} کاراکتر باشد`,
              },
            })}
          />
        </FormRow>
        <FormRow
          label='تکرار کلمه عبور'
          htmlFor='repeat-password'
          error={errors?.repeatedPassword?.message}
        >
          <Input
            id='repeat-password'
            disabled={isPending}
            type='password'
            {...register('repeatedPassword', {
              required: 'لطفا تکرار کلمه عبور خود را وارد کنید',
              validate: (value): ValidateResult => {
                return (
                  value === getValues().password ||
                  'کلمه عبور وارد شده با تکرار کلمه عبور یکسان نیست'
                );
              },
            })}
          />
        </FormRow>
        <div className='flex items-center justify-end py-4 gap-x-4'>
          <Button btnType='primary' type='submit' isPending={isPending}>
            ساخت کاربر جدید
          </Button>
          <Button btnType='secondary' type='reset'>
            لغو
          </Button>
        </div>
      </div>
    </form>
  );
}
