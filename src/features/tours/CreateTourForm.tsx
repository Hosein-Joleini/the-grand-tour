import { type TourRowInputsType } from '../../../types/global';
import {
  type SubmitHandler,
  useForm,
  type ValidateResult,
} from 'react-hook-form';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import ControlledDatePicker from '../../ui/ControlledDatePicker';
import useCreateTour from './useCreateTour';
import useTours from './useTours';
import useEditTour from './useEditTour';

export default function CreateTourForm({
  onCloseModal,
  tourId,
  isEditing = false,
}: {
  onCloseModal?: () => void;
  tourId?: number;
  isEditing?: boolean;
}) {
  const {
    mutate: createTour,
    isPending: isCreatingForm,
    reset,
  } = useCreateTour();
  const { mutate: editTour, isPending: isEditingForm } = useEditTour();

  const isWorking = isCreatingForm || isEditingForm;

  const { tours } = useTours();
  const editedTour = tours?.find((tour) => tour.id === tourId);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<TourRowInputsType>({
    defaultValues: isEditing ? editedTour : {},
  });

  const onSubmit: SubmitHandler<TourRowInputsType> = (tourInputData) => {
    if (isEditing) {
      const createdImageUrl = tourInputData.imageUrl
        ? tourInputData.imageUrl
        : editedTour?.imageUrl;
      const submitionTour = {
        ...tourInputData,
        imageUrl: createdImageUrl,
      };

      editTour(submitionTour, {
        onSuccess: () => {
          onCloseModal?.();
          reset();
        },
      });
    } else {
      createTour(tourInputData, {
        onSuccess: () => {
          onCloseModal?.();
          reset();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <div className='divide-y w-[48rem] h-[28rem] text-lg dark:bg-gray-800 dark:divide-gray-700 dark:text-slate-100'>
        <FormRow
          htmlFor='tour-name'
          label='نام تور'
          error={errors?.tourName?.message}
        >
          <Input
            type='text'
            id='tour-name'
            disabled={isWorking}
            {...register('tourName', { required: 'نام تور را وارد کنید' })}
          />
        </FormRow>

        <FormRow
          htmlFor='regular-price'
          label='قیمت تور'
          error={errors?.regularPrice?.message}
        >
          <Input
            type='number'
            min='0'
            disabled={isWorking}
            id='regular-price'
            {...register('regularPrice', {
              valueAsNumber: true,
              required: 'قیمت تور را وارد کنید',
            })}
          />
        </FormRow>

        <FormRow
          htmlFor='discount'
          label='تخفیف تور'
          error={errors?.discount?.message}
        >
          <Input
            type='number'
            min='0'
            id='discount'
            disabled={isWorking}
            {...register('discount', {
              valueAsNumber: true,
              required: 'تخفیف را وارد کنید',
              validate: (value): ValidateResult => {
                const regularPrice = getValues?.().regularPrice;

                return (
                  value !== null &&
                  regularPrice !== null &&
                  (value <= regularPrice ||
                    'تخفیف تور باید کمتر از قیمت تور باشد')
                );
              },
            })}
          />
        </FormRow>

        <FormRow
          htmlFor='max-capacity'
          label='ظرفیت تور'
          error={errors?.maxCapacity?.message}
        >
          <Input
            type='number'
            min='1'
            id='max-capacity'
            disabled={isWorking}
            {...register('maxCapacity', {
              valueAsNumber: true,
              required: 'ظرفیت تور را وارد کنید',
              min: {
                value: 1,
                message: 'ظرفیت باید بیش از یک نفر باشد',
              },
            })}
          />
        </FormRow>

        <FormRow htmlFor='accomodation' label='اقامتگاه تور'>
          <Input
            type='text'
            id='accomodation'
            {...register('accomodation')}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow
          htmlFor='location'
          label='مکان تور'
          error={errors?.location?.message}
        >
          <Input
            type='text'
            id='location'
            disabled={isWorking}
            {...register('location', { required: 'مکان تور را وارد کنید' })}
          />
        </FormRow>

        <FormRow
          htmlFor='start-date'
          label='تاریخ شروع تور'
          error={errors?.startDate?.message}
        >
          <ControlledDatePicker
            id='start-date'
            name='startDate'
            requiredText='تاریخ شروع تور را وارد کنید'
            control={control}
          />
        </FormRow>

        <FormRow
          htmlFor='end-date'
          label='تاریخ پایان تور'
          error={errors?.endDate?.message}
        >
          <ControlledDatePicker
            id='end-date'
            name='endDate'
            requiredText='تاریخ پایان تور را وارد کنید'
            control={control}
          />
        </FormRow>

        <FormRow
          htmlFor='description'
          label='توضیحات تور'
          error={errors?.description?.message}
        >
          <TextArea
            rows={4}
            id='description'
            disabled={isWorking}
            {...register('description', {
              required: 'توضیحات تور را وارد کنید',
            })}
          />
        </FormRow>

        <FormRow
          htmlFor='image'
          label='عکس تور'
          error={errors?.imageUrl?.message}
        >
          <FileInput
            id='image'
            disabled={isWorking}
            {...register('imageUrl', {
              required: !isEditing && 'فایل عکس آپلود نشده است',
            })}
          />
        </FormRow>

        <div className='py-4 flex items-center justify-end gap-6'>
          <Button
            btnType='primary'
            type='submit'
            isPending={isWorking}
            disabled={isWorking}
          >
            {isEditing ? 'اصلاح تور' : 'ایجاد تور جدید'}
          </Button>
          <Button btnType='secondary' type='reset' onClick={onCloseModal}>
            لغو
          </Button>
        </div>
      </div>
    </form>
  );
}
