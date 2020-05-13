// Format patterns
/**
 * @link https://date-fns.org/v2.9.0/docs/format#description
 */
export const DAY_ONLY_FORMAT = 'd'; // 1 - 31
export const DAY_ONLY_SHORT_FORMAT = 'dd'; // 01 - 31

export const MONTH_ONLY_FORMAT = 'M'; // 1 - 12
export const MONTH_ONLY_SHORT_FORMAT = 'MM'; // 01 - 12
export const MONTH_ONLY_LONG_FORMAT = 'MMM'; // Jan, Feb, ...
export const MONTH_ONLY_FULL_FORMAT = 'MMMM'; // January, February, ...

export const WEEKDAY_ONLY_LONG_FORMAT = 'eee'; // Mon, Tue, Wed, ...
export const WEEKDAY_ONLY_FULL_FORMAT = 'eeee'; // Monday, Tuesday,

export const YEAR_ONLY_SHORT_FORMAT = 'yy'; // 20
export const YEAR_ONLY_LONG_FORMAT = 'yyyy'; // 2020

// Full date format
/**
 * @link https://momentjs.com/docs/#/displaying/format/
 */
export const MOMENT_DATE_FORMAT = 'YYYY-MM-DD'; // 2020-12-31
export const MOMENT_TIME_FORMAT = 'HH:mm:ss'; // 23:59:59

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'; // 2020-12-31
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss'; // 23:59:59

export const ENTITY_LIST_DATE_TIME_FORMAT = 'EEE MMM yy h:mm a'; // Fri Feb 21 9:00 AM

export const LOCALIZED_DATE_FORMAT = 'P'; // 12/31/2020
export const LOCALIZED_DATE_SHORT_FORMAT = 'PP'; // December 31, 2020
export const LOCALIZED_DATE_LONG_FORMAT = 'PPP'; // December 31st, 2020
export const LOCALIZED_DATE_FULL_FORMAT = 'PPPP'; // Thursday, December 31st, 2020

export const LOCALIZED_DATE_AND_TIME_FORMAT = 'Pp'; // 12/31/2020 11:59:59 PM
export const LOCALIZED_DATE_AND_TIME_SHORT_FORMAT = 'PPpp'; // December 31, 2020 11:59:59 PM
export const LOCALIZED_DATE_AND_TIME_LONG_FORMAT = 'PPPppp'; // December 31st, 2020 at 11:59:59 PM GMT+08:00
export const LOCALIZED_DATE_AND_TIME_FULL_FORMAT = 'PPPPpppp'; // Thursday, December 31st, 2020 at 11:59:59 PM GMT+08:00

export const TIME_ONLY_12H_SHORT_FORMAT = 'h:mm a'; // 11:59 pm
export const TIME_ONLY_12H_LONG_FORMAT = 'hh:mm:ss b'; // 11:59:59 pm
export const TIME_ONLY_24H_SHORT_FORMAT = 'H:mm'; // 23:59
export const TIME_ONLY_24H_LONG_FORMAT = 'HH:mm:ss'; // 23:59:59
