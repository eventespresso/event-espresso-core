/**
 * External dependencies
 */
import { anyPass, filter, head } from 'ramda';

/**
 * Internal dependencies
 */
import { isOnSale, isPending } from '../../index';
import sortTicketsList from '../sortTicketsList';
import { Ticket } from '../../../../../../eventEditor/data/types';

const nextOnSaleOrPendingOnly = (tickets: Ticket[]): Ticket[] => {
	const isOnSaleOrIsPending = anyPass([isOnSale, isPending]);
	const allOnSaleAndPending = filter(isOnSaleOrIsPending)(tickets);
	const sortedOnSaleAndPending = sortTicketsList(allOnSaleAndPending);
	const nextOnSaleOrPending = [head(sortedOnSaleAndPending)].filter(Boolean);

	return nextOnSaleOrPending;
};

export default nextOnSaleOrPendingOnly;
