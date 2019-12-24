/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const upcomingOnly = (dates: Datetime[]) => {
	return dates.filter(({ isUpcoming }) => isUpcoming);
};

export default upcomingOnly;
