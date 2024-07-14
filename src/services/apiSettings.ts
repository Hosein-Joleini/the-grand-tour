import { UpdateSettingType } from '../../types/global';
import supabase from './supabase';

export async function getSettings() {
  const { data: settings, error } = await supabase.from('settings').select('*');

  if (error) {
    console.log(error);

    throw new Error('قادر به بارگذاری تنظیمات نیستیم. دوباره تلاش کنید.');
  }

  return settings[0];
}

export async function updateSettings(obj: UpdateSettingType) {
  const { error } = await supabase
    .from('settings')
    .update({ mealsPrice: obj.mealsPrice })
    .eq('id', obj.id)
    .select();

  if (error) {
    console.log(error);

    throw new Error('قادر به بروزرسانی تنظیمات نیستیم. دوباره تلاش کنید.');
  }
}
