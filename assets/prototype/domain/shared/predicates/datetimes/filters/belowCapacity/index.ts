/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/data/types';
import capacityBelow from '../../capacityBelow';

type BelowCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const belowCapacity = ({ capacity, dates }: BelowCapacityProps): Datetime[] | [] => {
	const filterFn = (date: Datetime) => {
		const withoutTrashed = is(Boolean, date.isDeleted) && !date.isDeleted;

		withoutTrashed && capacityBelow({ capacity, date });
	};

	return dates.filter(filterFn);
};

export default belowCapacity;
