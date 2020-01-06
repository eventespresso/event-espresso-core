/**
 * External dependencies
 */
import { isNil, not } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/data/types';

const allDates = (dates: Datetime[]) => {
	const withoutTrashed = ({ isDeleted }: Datetime) => not(isNil(isDeleted)) && !isDeleted;

	return dates.filter(withoutTrashed);
};

export default allDates;
