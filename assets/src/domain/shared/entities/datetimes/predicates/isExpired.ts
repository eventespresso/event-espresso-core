import { is } from 'ramda';

import { Datetime } from '../../../../eventEditor/services/apollo/types';
import { isTrashed } from '../../../services/predicates';

const isExpired = (date: Datetime): boolean => {
	return is(Boolean, date.isExpired) && date.isExpired && !isTrashed(date);
};

export default isExpired;
