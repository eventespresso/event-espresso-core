import React from 'react';

import { Datetime } from '@edtrServices/apollo/types';
import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { InlineEditInfinity, TextProps } from '@appInputs/InlineEditInput';
import {
	useDatetimeMutator,
	useUpdateRelatedTickets,
	useTicketQuantityForCapacity,
} from '@edtrServices/apollo/mutations';

interface DateCapacityProps {
	datetime: Datetime;
}

const DateCapacity: React.FC<DateCapacityProps> = ({ datetime }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const updateRelatedTickets = useUpdateRelatedTickets(datetime.id);
	const ticketQuantityForCapacity = useTicketQuantityForCapacity();

	const onChange: TextProps['onChange'] = (cap) => {
		const capacity = parseInfinity(cap);
		if (capacity !== datetime.capacity) {
			updateEntity({ capacity });

			const inputGenerator = ticketQuantityForCapacity(capacity);

			updateRelatedTickets(inputGenerator);
		}
	};

	return <InlineEditInfinity onChange={onChange}>{datetime.capacity}</InlineEditInfinity>;
};

export default DateCapacity;
