import useCurrentUser from './useCurrentUser';

export default function UserInformation() {
  const { user } = useCurrentUser();

  return (
    <div className='flex items-center gap-4 ml-8'>
      <img
        src={user?.user_metadata.avatar || '/default-user.jpg'}
        alt='User image'
        className='w-10 h-10 rounded-full object-cover object-center'
      />
      <span className='text-sm font-medium'>
        {user?.user_metadata.fullName}
      </span>
    </div>
  );
}
