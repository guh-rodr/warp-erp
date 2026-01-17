import { differenceInCalendarDays, isValid } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { getTodayDate } from '../lib/date';

const TIMEZONE = 'America/Sao_Paulo';

export function formatDate(input?: Date | string | null) {
  if (!input) return 'Nunca';

  const dateInput = new Date(input);

  if (!isValid(dateInput)) return 'Nunca';
  const now = new Date(getTodayDate());

  const zonedDate = toZonedTime(dateInput, TIMEZONE);
  const zonedToday = toZonedTime(now, TIMEZONE);

  const diffDays = differenceInCalendarDays(zonedToday, zonedDate);

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays === 2) return 'Anteontem';

  return formatInTimeZone(dateInput, TIMEZONE, 'dd/MM/yyyy');
}
