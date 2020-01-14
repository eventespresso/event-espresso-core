/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';
import isTrashed from '../../isTrashed';
import validFiniteCapacityLimit from '../../../../../entities/datetimes/predicates/validFiniteCapacityLimit';
import validInfiniteCapacityLimit from './validInfiniteCapacityLimit';
import validSold from '../../../../../entities/datetimes/predicates/validSold';

interface Props {
	capacity: number;
	date: Datetime;
}

/**
 * Filter function which returns true if sold/capacity less than than capacity
 */
const filter = ({ capacity, date }: Props): boolean => {
	const belowCapacityComparison = (): boolean => {
		if (date.capacity !== undefined && date.sold !== undefined) {
			return Math.round(date.sold) / Math.round(date.capacity) < capacity / 100;
		}

		return false;
	};

	return (
		!isTrashed(date) &&
		(validInfiniteCapacityLimit(date) ||
			(validSold(date) && validFiniteCapacityLimit(date) && belowCapacityComparison()))
	);
};

export default filter;
