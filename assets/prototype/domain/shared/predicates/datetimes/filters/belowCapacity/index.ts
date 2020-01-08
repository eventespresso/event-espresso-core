/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import capacityBelow from './capacityBelow';
import { Datetime } from '../../../../../eventEditor/data/types';

type BelowCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const belowCapacity = ({ capacity, dates }: BelowCapacityProps): Datetime[] | [] => {
	const filterFn = (date: Datetime) => {
		const withoutTrashed = is(Boolean, date.isDeleted) && !date.isDeleted;

		return withoutTrashed && capacityBelow({ capacity, date });
	};

	return dates.filter(filterFn);
};

export default belowCapacity;
