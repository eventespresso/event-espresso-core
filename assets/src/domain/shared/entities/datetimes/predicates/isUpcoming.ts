import { is } from 'ramda';
import { parseISO } from 'date-fns';

import { Datetime } from '../../../../eventEditor/services/apollo/types';
import { diff } from '../../../../../application/services/utilities/date';
import { isValidOrTrashed } from '../../../services/predicates';
import { now } from './filters';

const isUpcoming = (date: Datetime, includeTrashed = false): boolean => {
	const checkIfUpcoming = (): boolean => diff('seconds', parseISO(date.startDate), now) > 0;

	return (
		(isValidOrTrashed(date, includeTrashed) && checkIfUpcoming()) || (is(Boolean, isUpcoming) && date.isUpcoming)
	);
};

export default isUpcoming;
