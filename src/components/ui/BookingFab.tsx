import { RiCalendarLine } from 'react-icons/ri';
import { BOOKING_URL } from '@/config/booking';

export default function BookingFab() {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      className="fab"
      rel="noopener noreferrer"
      aria-label="Book appointment"
    >
      <RiCalendarLine />
    </a>
  );
}
