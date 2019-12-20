/**
 * External dependencies
 */
import { allPass, filter, head } from 'ramda';

/**
 * Internal dependencies
 */
import { isOnSale, isPending } from '../index';
import sortTicketsList from './sortTicketsList';

const nextOnSaleOrPendingOnly = (tickets: any[]) => {
	const selectedPredicates = [isOnSale, isPending];
	const onSaleAndPending = filter(allPass(selectedPredicates))(tickets);
	const sortedItems = sortTicketsList(onSaleAndPending);

	return [head(sortedItems)];
};

export default nextOnSaleOrPendingOnly;
