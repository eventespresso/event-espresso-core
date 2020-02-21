import { is } from 'ramda';
import { parseISO } from 'date-fns';

import { Datetime } from '../../../../eventEditor/services/apollo/types';
import { diff } from '../../../../../application/services/utilities/date';
import { isTrashed } from '../../../services/predicates';
import { isValidOrTrashed } from '../../../services/predicates';
import { now } from './filters';

const isExpired = (date: Datetime): boolean => {
	return (
		isValidOrTrashed(date) &&
		is(Boolean, date.isExpired) &&
		date.isExpired &&
		!isTrashed(date) &&
		diff('seconds', parseISO(date.endDate), now) < 0
	);
};

export default isExpired;
