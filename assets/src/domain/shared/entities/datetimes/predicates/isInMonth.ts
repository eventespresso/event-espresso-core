import { parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo';

const isInMonth = (date: Datetime, month: number): boolean => {
	return parseISO(date.startDate).getMonth() === month;
};

export default isInMonth;
