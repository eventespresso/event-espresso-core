import React, { useCallback } from 'react';

import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { InlineEditInfinity, TextProps } from '@appInputs/InlineEditInput';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { getPropsAreEqual } from '@appServices/utilities';
import type { TicketItemProps } from '../types';

const TicketQuantity: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onSubmit: TextProps['onSubmit'] = useCallback(
		(qty) => {
			const quantity = parseInfinity(qty);
			if (quantity !== ticket.quantity) {
				updateEntity({ quantity });
			}
		},
		[ticket.cacheId]
	);

	return <InlineEditInfinity onSubmit={onSubmit} value={ticket.quantity} />;
};

export default React.memo(TicketQuantity, getPropsAreEqual(['entity', 'cacheId']));
