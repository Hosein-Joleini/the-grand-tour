import { createPortal } from 'react-dom';
import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import Button from './Button';
import useOutsideClick from '../hooks/useOutsideClick';

type MenusContextType = {
  openMenuId: number | string;
  openMenu: (openId: number | string) => void;
  handlePosition: (rect: { x: number; y: number }) => void;
  position: { x: number; y: number } | null;
  closeMenu: () => void;
};

const MenusContext = createContext<MenusContextType>({
  openMenuId: '',
  openMenu() {},
  closeMenu() {},
  handlePosition() {},
  position: { x: 0, y: 0 },
});

export default function Menus({ children }: PropsWithChildren) {
  const [openMenuId, setOpenMenuId] = useState<number | string>('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const openMenu = (id: number | string) => setOpenMenuId(id);

  const closeMenu = () => setOpenMenuId('');

  const handlePosition = (rect: { x: number; y: number }) => setPosition(rect);

  return (
    <MenusContext.Provider
      value={{ openMenu, openMenuId, handlePosition, position, closeMenu }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: PropsWithChildren) {
  return children;
}

function Toggle({ openId }: { openId: number | string }) {
  const { openMenuId, openMenu, handlePosition, closeMenu } =
    useContext(MenusContext);

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();

    const rect = event.currentTarget.closest('button')?.getBoundingClientRect();
    if (rect) {
      handlePosition({
        x: Math.floor(rect?.x),
        y: Math.floor(rect?.y + rect.height + 4),
      });
    }
    if (openMenuId !== openId) {
      closeMenu();
      openMenu(openId);
    }

    openMenuId === '' || openMenuId !== openId ? openMenu(openId) : closeMenu();
  }

  return (
    <Button btnType='small' onClick={handleClick}>
      <HiOutlineEllipsisVertical />
    </Button>
  );
}

function List({
  children,
  nameId,
}: PropsWithChildren & { nameId: number | string }) {
  const { openMenuId, position, closeMenu } = useContext(MenusContext);

  const ref = useOutsideClick<HTMLUListElement>(closeMenu, false);

  if (openMenuId !== nameId) return null;

  return createPortal(
    <ul
      className={`flex flex-col bg-gray-50 dark:bg-gray-800 divide-y dark:divide-gray-700 shadow-md shadow-gray-900/25`}
      style={{
        position: 'absolute',
        top: `${position?.y}px`,
        left: `${position?.x}px`,
      }}
      ref={ref}
    >
      {children}
    </ul>,
    document.body!
  );
}

function ListItemButton({
  children,
  icon,
  onClick,
  disabled,
}: PropsWithChildren & {
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { closeMenu } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }

  return (
    <li className='text-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-300 '>
      <Button btnType='menu' onClick={handleClick} disabled={disabled}>
        {children}
        <span className='text-gray-500'>{icon}</span>
      </Button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.ListItemButton = ListItemButton;
