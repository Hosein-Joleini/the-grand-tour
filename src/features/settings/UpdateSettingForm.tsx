import { useRef } from 'react';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Loader from '../../ui/Loader';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

export default function UpdateSettingForm() {
  const { settings, isLoading } = useSettings();
  const inputRef = useRef<HTMLInputElement>(null);
  const updateSetting = useUpdateSettings();

  function focusHandler() {
    const enteredInputRef = Number(inputRef.current?.value);

    updateSetting({ id: settings?.id, mealsPrice: enteredInputRef });
  }

  if (isLoading) return <Loader />;

  return (
    <div className='bg-gray-50 py-4 px-8 text-lg rounded-md dark:bg-gray-800'>
      <FormRow htmlFor='meals-price' label='وعده ی غذایی روزانه (ریال)'>
        <Input
          id='meals-price'
          type='number'
          onBlur={focusHandler}
          defaultValue={settings?.mealsPrice}
          ref={inputRef}
        />
      </FormRow>
    </div>
  );
}
