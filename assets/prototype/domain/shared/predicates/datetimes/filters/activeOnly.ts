/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const activeUpcoming = (dates: Datetime[]) => {
	return dates.filter(({ isActive }) => isActive);
};

export default activeUpcoming;
