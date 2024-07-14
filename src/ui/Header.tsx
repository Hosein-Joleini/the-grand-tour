import { useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
} from 'react-icons/hi2';
import HeaderIconButton from './HeaderIconButton';
import UserInformation from '../features/authentication/UserInformation';
import useLogout from '../features/authentication/useLogout';
import MiniSpinner from './MiniSpinner';
import { useDarkMode } from '../context/DarkModeContext';

export default function Header() {
  const navigate = useNavigate();
  const { mutate: logout, isLogingOut } = useLogout();
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <header className='px-12 py-3 border-b border-b-gray-200 flex items-center justify-end gap-1 dark:border-b-gray-700'>
      <UserInformation />
      <HeaderIconButton
        icon={<HiOutlineUser />}
        onClick={() => navigate('account')}
      />
      <HeaderIconButton
        icon={isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        onClick={() => toggleDarkMode()}
      />
      {isLogingOut ? (
        <MiniSpinner />
      ) : (
        <HeaderIconButton
          icon={<HiOutlineArrowLeftStartOnRectangle />}
          onClick={() => logout()}
        />
      )}
    </header>
  );
}
