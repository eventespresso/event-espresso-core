/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';
import capacityBelow from '../capacityBelow';

type BelowCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const belowCapacity = ({ capacity, dates }: BelowCapacityProps) => {
	const filterFn = (date) => !date.isDeleted && capacityBelow(date, capacity);

	return dates.filter(filterFn);
};

export default belowCapacity;
