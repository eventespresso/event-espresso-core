/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/data/types';
import isTrashed from '../../isTrashed';
import validFiniteCapacityLimit from '../../validFiniteCapacityLimit';
import validInfiniteCapacityLimit from './validInfiniteCapacityLimit';
import validSold from '../../validSold';

interface filterProps {
	capacity: number;
	date: Datetime;
}

/**
 * Filter function which returns true if sold/capacity less than than capacity
 */
const filter = ({ capacity, date }: filterProps): boolean => {
	return (
		!isTrashed(date) &&
		(validInfiniteCapacityLimit(date) ||
			(validSold(date) &&
				validFiniteCapacityLimit(date) &&
				Math.round(date.sold) / Math.round(date.capacity) < capacity / 100))
	);
};

export default filter;
