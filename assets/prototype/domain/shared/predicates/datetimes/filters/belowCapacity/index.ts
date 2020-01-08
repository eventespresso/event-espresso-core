/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import capacityBelow from './capacityBelow';
import isTrashed from '../../isTrashed';
import { Datetime } from '../../../../../eventEditor/data/types';

type BelowCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const belowCapacity = ({ capacity, dates }: BelowCapacityProps): Datetime[] | [] => {
	const filterFn = (date: Datetime) => {
		return !isTrashed(date) && capacityBelow({ capacity, date });
	};

	return dates.filter(filterFn);
};

export default belowCapacity;
