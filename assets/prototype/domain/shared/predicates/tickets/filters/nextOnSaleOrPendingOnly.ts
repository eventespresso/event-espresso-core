/**
 * External dependencies
 */
import { allPass, filter, head } from 'ramda';

/**
 * Internal dependencies
 */
import { isOnSale, isPending } from '../index';
import sortTicketsList from './sortTicketsList';
import { Ticket } from '../../../../eventEditor/data/types';

const nextOnSaleOrPendingOnly = (tickets: Ticket[]) => {
	const selectedPredicates = [isOnSale, isPending];
	const onSaleAndPending = filter(allPass(selectedPredicates))(tickets);
	const sortedItems = sortTicketsList(onSaleAndPending);

	return [head(sortedItems)];
};

export default nextOnSaleOrPendingOnly;
