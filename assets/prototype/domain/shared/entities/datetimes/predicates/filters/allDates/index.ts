/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';

const allDates = (dates: Datetime[]): Datetime[] | [] => {
	const withoutTrashed = ({ isDeleted }: Datetime) => {
		return is(Boolean, isDeleted) && !isDeleted;
	};

	return dates.filter(withoutTrashed);
};

export default allDates;
