import { zonedTimeToUtc } from 'date-fns-tz';

import { TzDateFn } from './types';

const localToUtc: TzDateFn = (date, timezone) => {
	return zonedTimeToUtc(date, timezone);
};

export default localToUtc;
