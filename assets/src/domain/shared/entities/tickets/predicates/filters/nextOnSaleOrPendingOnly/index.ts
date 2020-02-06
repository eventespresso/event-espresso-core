/**
 * External dependencies
 */
import { anyPass, filter, head } from 'ramda';

/**
 * Internal dependencies
 */
import { isOnSale, isPending } from '../../index';
import sorters from '../../sorters';
import { TicketFilterFn } from '../types';

const nextOnSaleOrPendingOnly: TicketFilterFn = (tickets) => {
	const isOnSaleOrIsPending = anyPass([isOnSale, isPending]);
	const allOnSaleAndPending = filter(isOnSaleOrIsPending)(tickets);
	const sortedOnSaleAndPending = sorters({ tickets: allOnSaleAndPending });
	const nextOnSaleOrPending = [head(sortedOnSaleAndPending)].filter(Boolean);

	return nextOnSaleOrPending;
};

export default nextOnSaleOrPendingOnly;
