import { RiInstagramLine, RiTelegram2Line } from 'react-icons/ri';
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
    icon: RiInstagramLine,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/ElizaBaydak',
    icon: RiTelegram2Line,
  },
];
