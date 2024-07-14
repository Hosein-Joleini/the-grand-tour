import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';
import { SettingsType } from '../../../types/global';

export default function useSettings() {
  const { data: settings, isLoading } = useQuery<SettingsType>({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { settings, isLoading };
}
