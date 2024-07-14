import { type PropsWithChildren } from 'react';

export default function Row({
  children,
  type,
}: PropsWithChildren & { type: 'horizontal' | 'vertical' }) {
  return (
    <div
      className={`${
        type === 'horizontal'
          ? 'flex justify-between items-center mb-8'
          : 'flex flex-col mb-8'
      }`}
    >
      {children}
    </div>
  );
}
