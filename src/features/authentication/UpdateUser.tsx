import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { UpdateUserType } from '../../../types/global';
import useCurrentUser from './useCurrentUser';
import useUpdateUser from './useUpdateUser';

export default function UpdateUser() {
  const { user } = useCurrentUser();
  const { mutate: updateUser, isPending, isSuccess } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserType>({
    defaultValues: {
      email: user?.user_metadata.email,
      fullName: user?.user_metadata.fullName,
      avatar: user?.user_metadata.avatar,
    },
  });

  function onSubmit({ email, fullName, avatar }: UpdateUserType) {
    updateUser({ avatar, fullName, email });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
      <div className='bg-gray-50 rounded-md px-8 py-4 divide-y text-md font-medium dark:bg-gray-800 dark:divide-gray-700'>
        <FormRow htmlFor='email' label='آدرس ایمیل'>
          <Input id='email' disabled {...register('email')} />
        </FormRow>
        <FormRow
          htmlFor='update-fullname'
          label='نام و نام خانوادگی'
          error={errors?.fullName?.message}
        >
          <Input
            id='update-fullname'
            {...register('fullName', {
              minLength: 1,
              required: 'نام و نام خانوادگی نباید خالی باشد',
            })}
            disabled={isPending && !isSuccess}
          />
        </FormRow>
        <FormRow htmlFor='avatar' label='عکس کاربر'>
          <FileInput
            id='avatar'
            {...register('avatar')}
            disabled={isPending && !isSuccess}
          />
        </FormRow>
        <div className='flex items-center justify-end py-4 gap-x-4'>
          <Button
            btnType='primary'
            type='submit'
            isPending={isPending && !isSuccess}
          >
            بروز رسانی حساب
          </Button>
          <Button btnType='secondary' type='reset'>
            لغو
          </Button>
        </div>
      </div>
    </form>
  );
}
