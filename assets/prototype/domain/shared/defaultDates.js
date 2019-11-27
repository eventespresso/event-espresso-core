export const NOW = new Date();
export const CURRENT_YEAR = NOW.getFullYear();
export const CURRENT_MONTH = NOW.getMonth();
export const CURRENT_DAY = NOW.getDay();
export const PLUS_ONE_MONTH = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, CURRENT_DAY);
export const PLUS_TWO_MONTHS = new Date(CURRENT_YEAR, CURRENT_MONTH + 2, CURRENT_DAY);
export const PLUS_TEN_YEARS = new Date(CURRENT_YEAR + 10, 11, 31);
export const A_LONG_TIME_AGO = new Date(CURRENT_YEAR - 100, 0, 1);
