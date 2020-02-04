/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';
import isTrashed from '../../../../../predicates/shared/isTrashed';

const expiredOnly = (dates: Datetime[]): Datetime[] | [] => {
	const filterFn = (date: Datetime): boolean => {
		return is(Boolean, date.isExpired) && date.isExpired && !isTrashed(date);
	};

	return dates.filter(filterFn);
};

export default expiredOnly;
