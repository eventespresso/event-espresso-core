import { useCallback } from 'react';

import { parseInfinity } from '@appServices/utilities/number';
import { Ticket } from '@edtrServices/apollo';
import { UpdateTicketInput } from '@edtrServices/apollo/mutations';

type InputGenerator = (ticket: Ticket) => UpdateTicketInput;
type UpdateCallback = (capacity: number) => InputGenerator;

const useTicketQuantityForCapacity = (): UpdateCallback => {
	return useCallback<UpdateCallback>((capacity: number) => {
		// capacity is expected to be a number.
		const nonNegativeDateCapacity = parseInfinity(capacity, Infinity);

		const inputGenerator: InputGenerator = (ticket) => {
			// Make sure that the non negative ticket quantity value is compared with
			// a non negative datetime capacity value in Math.min()
			const nonNegativeTicketQuantity = parseInfinity(ticket.quantity, Infinity);

			const quantity = parseInfinity(Math.min(nonNegativeDateCapacity, nonNegativeTicketQuantity));

			return { quantity };
		};

		return inputGenerator;
	}, []);
};

export default useTicketQuantityForCapacity;
