/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';

const activeUpcoming = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(({ isActive, isUpcoming }) => isActive || isUpcoming);
};

export default activeUpcoming;
