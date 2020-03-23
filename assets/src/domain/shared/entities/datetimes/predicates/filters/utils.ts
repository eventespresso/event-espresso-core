import { parseISO, formatISO } from 'date-fns';

export const now = parseISO(formatISO(new Date()));
