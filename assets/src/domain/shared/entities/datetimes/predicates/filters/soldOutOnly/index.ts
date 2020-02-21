import isSoldOut from '../../isSoldOut';

import { DatetimeFilterFn } from '../types';

const soldOutOnly: DatetimeFilterFn = (dates) => {
	return dates.filter(isSoldOut);
};

export default soldOutOnly;
