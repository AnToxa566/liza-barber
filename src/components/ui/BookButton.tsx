import React from 'react';
import { BOOKING_URL } from '@/config/booking';

type BookButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> & {
  children: React.ReactNode;
  type?: string;
};

export function BookButton({ children, type: _type, ...props }: BookButtonProps) {
  return (
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
