import React, { useCallback } from 'react';

import { Ticket } from '@edtrServices/apollo/types';
import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { InlineEditInfinity, TextProps } from '@appInputs/InlineEditInput';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { getPropsAreEqual } from '@appServices/utilities';

interface TicketQuantityProps {
	ticket: Ticket;
}

const TicketQuantity: React.FC<TicketQuantityProps> = ({ ticket }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onChange: TextProps['onChange'] = useCallback(
		(qty) => {
			const quantity = parseInfinity(qty);
			if (quantity !== ticket.quantity) {
				updateEntity({ quantity });
			}
		},
		[ticket.cacheId]
	);

	return <InlineEditInfinity onChange={onChange}>{ticket.quantity}</InlineEditInfinity>;
};

export default React.memo(TicketQuantity, getPropsAreEqual(['ticket', 'cacheId']));
