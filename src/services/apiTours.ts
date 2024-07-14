const supabaseImageUrl = `${import.meta.env
  .VITE_SUPABASE_URL!}/storage/v1/object/public/tour-images`;

import supabase from './supabase';

import {
  type CreatedTourType,
  type TourRowInputsType,
} from '../../types/global';

export async function getTours() {
  const { data: tours, error } = await supabase.from('tours').select('*');

  if (error) {
    console.log(error);

    throw new Error('قادر به بارگذاری تور ها نیستیم کمی بعد تلاش کنید.');
  }

  return tours;
}

export async function createEditTour(
  tour: TourRowInputsType & { id?: number }
) {
  let filePath: string;
  let imageData: { path: string } | undefined;

  if (typeof tour.imageUrl === 'string') {
    filePath = tour.imageUrl;
  } else {
    filePath = `${Date.now()}_${tour.imageUrl && tour.imageUrl[0].name}`;
  }

  async function uploadFile(file: File) {
    const { data, error } = await supabase.storage
      .from('tour-images')
      .upload(filePath, file);
    if (error) {
      console.log(error);
      throw new Error('عکس آپلود نمی شود دوباره تلاش کنید');
    } else {
      return data;
    }
  }

  if (
    tour.imageUrl &&
    tour.imageUrl !== undefined &&
    typeof tour.imageUrl !== 'string'
  ) {
    imageData = await uploadFile(tour.imageUrl[0]);
  }

  const createdTour: CreatedTourType = {
    ...tour,
    imageUrl:
      typeof tour.imageUrl === 'string'
        ? filePath
        : `${supabaseImageUrl}/${imageData?.path}`,
  };

  const { data, error } = !tour.id
    ? await supabase.from('tours').insert(createdTour).select()
    : await supabase
        .from('tours')
        .update({ ...createdTour })
        .eq('id', tour.id)
        .select();

  if (error) {
    console.log(error);
    throw new Error(
      tour.id === undefined
        ? 'قادر به ساخت تور نیستیم دوباره تلاش کنید'
        : 'فادر به بروزرسانی تور نیستیم دوباره تلاش کنید'
    );
  }

  return data;
}

export async function duplicateTour(tour: CreatedTourType) {
  const { error } = await supabase.from('tours').insert(tour).select();

  if (error) {
    console.log(error);

    throw new Error('قادر به کپی تور نیستیم. لطفا دوباره تلاش کنید.');
  }
}

export async function deleteTourById(id: number) {
  const { error } = await supabase.from('tours').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('قادر به حذف تور نیستیم. لطفا دوباره تلاش کنید.');
  }
}
