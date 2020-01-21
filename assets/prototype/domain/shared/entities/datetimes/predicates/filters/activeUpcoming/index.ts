/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';

const activeUpcoming = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(({ isActive, isUpcoming }) => isActive || isUpcoming);
};

export default activeUpcoming;
