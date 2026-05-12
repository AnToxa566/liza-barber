import { FaInstagram, FaTelegram } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export interface Social {
  label: string;
  href: string;
  icon: IconType;
}

export const socials: Social[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/eliza.baidak/',
    icon: FaInstagram,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/ElizaBaydak',
    icon: FaTelegram,
  },
];
