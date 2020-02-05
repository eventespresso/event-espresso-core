/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const activeUpcoming = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(({ isActive, isUpcoming }) => isActive || isUpcoming);
};

export default activeUpcoming;
