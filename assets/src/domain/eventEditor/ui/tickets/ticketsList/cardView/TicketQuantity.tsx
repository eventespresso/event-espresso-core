import React from 'react';

import { Ticket } from '@edtrServices/apollo/types';
import parseInfinity from '@appServices/utilities/parseInfinity';
import { InlineEditInfinity, TextProps } from '@appInputs/InlineEditInput';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

interface TicketQuantityProps {
	ticket: Ticket;
}

const TicketQuantity: React.FC<TicketQuantityProps> = ({ ticket }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onChange: TextProps['onChange'] = (qty) => {
		const quantity = parseInfinity(qty);
		if (quantity !== ticket.quantity) {
			updateEntity({ quantity });
		}
	};

	return <InlineEditInfinity onChange={onChange}>{ticket.quantity}</InlineEditInfinity>;
};

export default TicketQuantity;
