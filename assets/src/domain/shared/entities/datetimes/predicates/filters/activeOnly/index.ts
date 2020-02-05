/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';

const activeOnly = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(({ isActive }) => {
		return is(Boolean, isActive) && isActive;
	});
};

export default activeOnly;
