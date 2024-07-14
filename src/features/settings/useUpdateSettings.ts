import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '../../services/apiSettings';
import toast from 'react-hot-toast';
import { UpdateSettingType } from '../../../types/global';

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting } = useMutation<void, Error, UpdateSettingType>(
    {
      mutationFn: updateSettings,

      onSuccess: () => {
        toast.success('تنظیمات با موفقیت بروز شد.');

        queryClient.invalidateQueries({ queryKey: ['settings'] });
      },

      onError: () => {
        toast.error('متاسفانه تنظیمات بروز نشد.');
      },
    }
  );

  return updateSetting;
}
