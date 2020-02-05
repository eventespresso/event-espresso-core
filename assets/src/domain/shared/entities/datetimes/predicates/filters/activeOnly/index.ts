/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const activeOnly = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(({ isActive }) => {
		return is(Boolean, isActive) && isActive;
	});
};

export default activeOnly;
