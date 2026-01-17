import { formatInTimeZone } from 'date-fns-tz';

export const getTodayDate = () => {
  const TIMEZONE_BR = 'America/Sao_Paulo';

  return formatInTimeZone(new Date(), TIMEZONE_BR, 'yyyy-MM-dd');
};
