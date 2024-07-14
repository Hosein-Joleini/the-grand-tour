import { useEffect, useRef } from 'react';

export default function useOutsideClick<T extends HTMLElement>(
  fn: () => void,
  listenCapture = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    };

    document.addEventListener('click', handleClickOutside, listenCapture);

    return () =>
      document.removeEventListener('click', handleClickOutside, listenCapture);
  }, [fn, listenCapture]);

  return ref;
}
