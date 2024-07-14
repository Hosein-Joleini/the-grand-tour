import { useDarkMode } from '../context/DarkModeContext';

export default function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='flex justify-center mb-8'>
      <img
        src={`${isDarkMode ? '/dark-logo.png' : '/light-logo.png'}`}
        alt='The grand tour logo'
        className='w-40 h-40 rounded-full object-center object-cover'
      />
    </div>
  );
}
