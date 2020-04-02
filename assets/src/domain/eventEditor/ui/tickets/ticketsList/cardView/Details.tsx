import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { Ticket } from '@edtrServices/apollo/types';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import TicketDetailsPanel from './TicketDetailsPanel';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { getPropsAreEqual } from '@appServices/utilities';
import CurrencyInput from '@appInputs/CurrencyInput';

interface DetailsProps {
	ticket: Ticket;
}

const Details: React.FC<DetailsProps> = ({ ticket }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onChangeName = useCallback(
		(name: string): void => {
			if (name !== ticket.name) {
				updateEntity({ name });
				updateEntity({ name });
			}
		},
		[ticket.cacheId]
	);

	const onChangeDesc = useCallback(
		(description: string): void => {
			if (description !== ticket.description) {
				updateEntity({ description });
			}
		},
		[ticket.cacheId]
	);

	const onChangePrice = useCallback(
		({ amount: price }: any): void => {
			price = parseFloat(price);
			if (price !== ticket.price) {
				updateEntity({ price });
			}
		},
		[ticket.cacheId]
	);

	return (
		<>
			<InlineEditHeading level={3} className={'entity-card-details__name'} onChange={onChangeName}>
				{ticket.name ? ticket.name : __('Edit title...')}
			</InlineEditHeading>

			<InlineEditTextArea className={'entity-card-details__description'} onChange={onChangeDesc}>
				{ticket.description ? ticket.description : __('Edit description...')}
			</InlineEditTextArea>

			<CurrencyInput
				id={ticket.id}
				amount={ticket.price}
				placeholder={__('set price...')}
				inputProps={{ ellipsis: false }}
				wrapperProps={{ className: 'entity-card-details__price' }}
				onChange={onChangePrice}
				tag={'h3'}
			/>

			<TicketDetailsPanel ticket={ticket} />
		</>
	);
};

export default React.memo(Details, getPropsAreEqual(['ticket', 'cacheId']));
