import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import TicketRegistrationsLink from '../../TicketRegistrationsLink';
import { EntityDetailsPanel } from '@appDisplay/enityDetails';
import { Ticket } from '@edtrServices/apollo/types';
import TicketQuantity from './TicketQuantity';

interface TicketDetailsProps {
	ticket: Ticket;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
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
				value: <TicketQuantity ticket={ticket} />,
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
