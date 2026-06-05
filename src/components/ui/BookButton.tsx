import React from 'react';
import { BOOKING_URL } from '@/config/booking';

type BookButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> & {
  children: React.ReactNode;
  type?: string;
  url?: string;
};

export function BookButton({ children, type: _type, url, ...props }: BookButtonProps) {
  return (
    <a href={url ?? BOOKING_URL} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
