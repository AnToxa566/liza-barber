'use client';

import React from 'react';

interface BookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

declare global {
  interface Window {
    altegioWidget?: { open: () => void };
  }
}

export function BookButton({ children, onClick, ...props }: BookButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    window.altegioWidget?.open();
    onClick?.(e);
  }

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}
