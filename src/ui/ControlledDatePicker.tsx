import { type TourRowInputsType } from '../../types/global';
import { type Control, Controller } from 'react-hook-form';

import DatePicker from 'react-multi-date-picker';

import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import transition from 'react-element-popper/animations/transition';

const datePickerInputClasses =
  'outline-none rounded-md border px-1.5 py-2 border-gray-300 bg-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-base text-slate-700 hover:bg-emerald-100 transition-all duration-300 w-full dark:bg-gray-900 dark:hover:bg-gray-800';

export default function ControlledDatePicker({
  control,
  name,
  requiredText,
  id,
}: {
  id: string;
  requiredText: string;
  name: 'startDate' | 'endDate';
  control: Control<TourRowInputsType>;
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: requiredText }}
      render={({ field: { onChange } }) => (
        <>
          <DatePicker
            placeholder='روز / ماه / سال'
            calendarPosition='bottom-center'
            className='bg-gray-50'
            minDate={new Date()}
            id={id}
            inputClass={datePickerInputClasses}
            animations={[transition({ duration: 500, from: 35 })]}
            locale={persian_fa}
            calendar={persian}
            onChange={(date): void => {
              const convertedDate =
                date &&
                date.unix &&
                new Date(date.unix * 1000).toISOString().slice(0, 10);

              onChange(convertedDate);
            }}
          />
        </>
      )}
    />
  );
}
