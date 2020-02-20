import { anyPass, is } from 'ramda';
import { parseISO } from 'date-fns';

import { diff } from '../../../../../application/services/utilities/date';

import { isValidOrTrashed } from '../../../services/predicates';
import { Datetime } from '../../../../eventEditor/services/apollo/types';

const isUpcoming = (date: Datetime, includeTrashed: boolean): boolean => {
	const checkIfUpcoming = (): boolean => diff('seconds', parseISO(date.startDate), new Date()) > 0;
	const predicates = [
		(): boolean => isValidOrTrashed(date, includeTrashed) && checkIfUpcoming(),
		(): boolean => is(Boolean, isUpcoming) && date.isUpcoming,
	];

	return anyPass(predicates)();
};

export default isUpcoming;
