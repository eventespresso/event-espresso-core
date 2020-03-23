import { anyPass, filter } from 'ramda';
import isOnSale from '../../isOnSale';
import isPending from '../../isPending';
import { TicketFilterFn } from '../types';

const allOnSaleAndPending: TicketFilterFn = (tickets) => {
	const isOnSaleOrIsPending = anyPass([isOnSale, isPending]);
	const onSaleAndPending = filter(isOnSaleOrIsPending, tickets);
	return onSaleAndPending;
};

export default allOnSaleAndPending;
