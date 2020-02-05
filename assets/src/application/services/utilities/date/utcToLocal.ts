import { utcToZonedTime } from 'date-fns-tz';

import { TzDateFn } from './types';

const utcToLocal: TzDateFn = (date, timezone) => {
	return utcToZonedTime(date, timezone);
};

export default utcToLocal;
