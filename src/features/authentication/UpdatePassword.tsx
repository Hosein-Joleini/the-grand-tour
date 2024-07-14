import FormRow from '../../ui/FormRow';
import { formatNumberToFarsi } from '../../utils/helpers';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useForm, ValidateResult } from 'react-hook-form';
import { UpdateUserType } from '../../../types/global';
import useUpdateUser from './useUpdateUser';

export default function UpdatePassword() {
  const { mutate: updatePassword, isPending, isSuccess } = useUpdateUser();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UpdateUserType & { repeatedPassword: string }>();

  function onSubmit({ password }: UpdateUserType) {
    updatePassword({ password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset}>
      <div className='bg-gray-50 rounded-md px-8 py-4 divide-y text-md font-medium dark:bg-gray-800 dark:divide-gray-700'>
        <FormRow
          label={`کلمه عبور (حداقل ${formatNumberToFarsi(8)} کاراکتر)`}
          htmlFor='password'
          error={errors?.password?.message}
        >
          <Input
            id='password'
            type='password'
            disabled={isPending && !isSuccess}
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
            type='password'
            disabled={isPending && !isSuccess}
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
          <Button
            btnType='primary'
            type='submit'
            isPending={isPending && !isSuccess}
          >
            بروز رسانی کلمه عبور
          </Button>
          <Button btnType='secondary' type='reset'>
            لغو
          </Button>
        </div>
      </div>
    </form>
  );
}
