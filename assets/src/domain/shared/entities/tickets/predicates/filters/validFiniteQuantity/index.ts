import { is } from 'ramda';

import { Ticket } from '../../../../../../../../prototype/domain/eventEditor/data/types';

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = (ticket: Ticket): boolean => {
	const { quantity } = ticket;
	const isNumber = is(Number, quantity);
	const isFinite = Number.isFinite(quantity);

	return isNumber && isFinite && Math.round(quantity) > 0;
};

export default validFiniteQuantity;
