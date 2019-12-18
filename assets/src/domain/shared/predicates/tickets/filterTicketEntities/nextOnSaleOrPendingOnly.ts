/**
 * External dependencies
 */
import { allPass, filter, head } from 'ramda';

/**
 * Internal dependencies
 */
import { isOnSale, isPending } from '../../../../../application/entities/ticket';
import sortTicketEntitiesList from './sortTicketEntitiesList';

const nextOnSaleOrPendingOnly = (ticketEntities: any[]) => {
	const selectedPredicates = [isOnSale, isPending];
	const onSaleAndPending = filter(allPass(selectedPredicates))(ticketEntities);
	const sortedItems = sortTicketEntitiesList(onSaleAndPending);

	return [head(sortedItems)];
};

export default nextOnSaleOrPendingOnly;
