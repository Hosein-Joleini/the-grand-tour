import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({ isDarkMode: false, toggleDarkMode() {} });

const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
