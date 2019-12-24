/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const allDates = (dates: Datetime[]) => {
	const withoutTrashed = (date) => date.deleted;
	return dates.filter(withoutTrashed);
};

export default allDates;
