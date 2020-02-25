import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import TicketRegistrationsLink from '../../TicketRegistrationsLink';
import useTicketRegistrationCount from '../../hooks/useTicketRegistrationCount';
import InfinitySymbol from '@application/valueObjects/InfinitySymbol';
import parseInfinity from '@appServices/utilities/parseInfinity';
import { EntityDetailsPanel } from '@appDisplay/enityDetails';
import { MutatorFn } from '@appServices/apollo/mutations';
import { Ticket } from '@edtrServices/apollo/types';

interface TicketDetailsProps {
	ticket: Ticket;
	updateTicket: MutatorFn;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, updateTicket }) => {
	const registrationCount = useTicketRegistrationCount(ticket.id);

	return useMemo(() => {
		const details = [
			{
				id: 'ee-ticket-sold',
				label: __('sold'),
				value: ticket.sold,
			},
			{
				id: 'ee-ticket-qty',
				label: __('quantity'),
				value: <InfinitySymbol value={ticket.quantity} asInt />,
				editable: {
					type: 'text',
					valueType: 'infinite',
					onChange: (value: any) => {
						const quantity = parseInfinity(value, true);
						updateTicket({ quantity });
						return <InfinitySymbol value={quantity} asInt />;
					},
				},
			},
			{
				id: 'ee-ticket-reserved',
				label: __('reg count'),
				value: registrationCount,
			},
			{
				id: 'ee-ticket-registrations',
				label: __('reg list'),
				value: <TicketRegistrationsLink ticket={ticket} />,
			},
		];
		return <EntityDetailsPanel details={details} className='ee-editor-ticket-details-sold-rsrvd-qty-div' />;
	}, [ticket.quantity, ticket.sold]);
};

export default TicketDetails;
