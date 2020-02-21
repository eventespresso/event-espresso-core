import { is } from 'ramda';
import { parseISO } from 'date-fns';

import { Datetime } from '../../../../eventEditor/services/apollo/types';
import { diff } from '../../../../../application/services/utilities/date';
import { isValidOrTrashed } from '../../../services/predicates';
import { now } from './filters';

const isActive = (date: Datetime, includeTrashed = false): boolean => {
	return (
		(isValidOrTrashed(date, includeTrashed) &&
			diff('seconds', parseISO(date.startDate), now) < 0 &&
			diff('seconds', parseISO(date.endDate), now) > 0) ||
		(is(Boolean, isActive) && date.isActive)
	);
};

export default isActive;
