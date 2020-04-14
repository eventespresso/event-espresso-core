import React, { useCallback } from 'react';

import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { InlineEditInfinity, TextProps } from '@appInputs/InlineEditInput';
import {
	useDatetimeMutator,
	useUpdateRelatedTickets,
	useTicketQuantityForCapacity,
} from '@edtrServices/apollo/mutations';
import { getPropsAreEqual } from '@appServices/utilities';
import type { DateItemProps } from '../types';

const DateCapacity: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const updateRelatedTickets = useUpdateRelatedTickets(datetime.id);
	const ticketQuantityForCapacity = useTicketQuantityForCapacity();

	const onSubmit: TextProps['onSubmit'] = useCallback(
		(cap) => {
			const capacity = parseInfinity(cap);
			if (capacity !== datetime.capacity) {
				updateEntity({ capacity });

				const inputGenerator = ticketQuantityForCapacity(capacity);

				updateRelatedTickets(inputGenerator);
			}
		},
		[datetime.cacheId]
	);

	return <InlineEditInfinity onSubmit={onSubmit} value={datetime.capacity} />;
};

export default React.memo(DateCapacity, getPropsAreEqual(['entity', 'cacheId']));
