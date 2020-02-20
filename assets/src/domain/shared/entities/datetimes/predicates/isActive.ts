import { is } from 'ramda';
import { parseISO } from 'date-fns';

import { Datetime } from '../../../../eventEditor/services/apollo/types';
import { diff } from '../../../../../application/services/utilities/date';
import { isValidOrTrashed } from '../../../services/predicates';

const isActive = (date: Datetime, includeTrashed: boolean): boolean => {
	return (
		(isValidOrTrashed(date, includeTrashed) &&
			diff('seconds', parseISO(date.startDate), new Date()) < 0 &&
			diff('seconds', parseISO(date.endDate), new Date()) > 0) ||
		(is(Boolean, isActive) && date.isActive)
	);
};

export default isActive;
