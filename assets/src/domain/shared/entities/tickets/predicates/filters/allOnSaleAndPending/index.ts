import { anyPass, filter } from 'ramda';
import isOnSale from '../../isOnSale';
import isPending from '../../isPending';
import { Ticket } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const allOnSaleAndPending = (tickets: Ticket[]): Ticket[] => {
	const isOnSaleOrIsPending = anyPass([isOnSale, isPending]);
	const onSaleAndPending = filter(isOnSaleOrIsPending)(tickets);
	return onSaleAndPending;
};

export default allOnSaleAndPending;
