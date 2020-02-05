import { anyPass, filter } from 'ramda';
import isOnSale from '../../isOnSale';
import isPending from '../../isPending';
import { Ticket } from '../../../../../../eventEditor/services/apollo/types';

const allOnSaleAndPending = (tickets: Ticket[]): Ticket[] => {
	const isOnSaleOrIsPending = anyPass([isOnSale, isPending]);
	const onSaleAndPending = filter(isOnSaleOrIsPending)(tickets);
	return onSaleAndPending;
};

export default allOnSaleAndPending;
