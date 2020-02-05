/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';
import filter from './filter';

type BelowCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const belowCapacity = ({ capacity, dates }: BelowCapacityProps): Datetime[] | [] => {
	return dates.filter((date) => filter({ capacity, date }));
};

export default belowCapacity;
