import { parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo';

const isInYear = (date: Datetime, year: number): boolean => {
	return parseISO(date.startDate).getFullYear() === year;
};

export default isInYear;
