const supabaseImageUrl = `${import.meta.env
  .VITE_SUPABASE_URL!}/storage/v1/object/public/avatars`;

import {
  LoginInputsType,
  SignUpInputsType,
  UpdateUserType,
} from '../../types/global';
import supabase from './supabase';

export async function signUpUser({
  fullName,
  email,
  password,
}: SignUpInputsType) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });

  if (error) {
    console.log(error);

    throw new Error('کاربر جدید ساخته نشد. دوباره تلاش کنید.');
  }
}

export async function loginUser({ email, password }: LoginInputsType) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);

    throw new Error('شما وارد نشدید. لطفا دوباره تلاش کنید');
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function updateUserInformation({
  fullName,
  avatar,
  password,
}: UpdateUserType) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData ?? {});
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar[0]);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseImageUrl}/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error('متاسفانه شما خارج نشدید. لطفا دوباره تلاش کنید');
  }
}
