import React from 'react';
import { __ } from '@wordpress/i18n';

import TicketRegistrationsLink from '../../TicketRegistrationsLink';
import { EntityDetailsPanel } from '@application/ui/display/entityDetailsPanel';
import { Ticket } from '@edtrServices/apollo/types';
import TicketQuantity from './TicketQuantity';
import { getPropsAreEqual } from '@appServices/utilities';

interface TicketDetailsPanelProps {
	ticket: Ticket;
}

const TicketDetailsPanel: React.FC<TicketDetailsPanelProps> = React.memo(({ ticket }) => {
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
});

export default React.memo(TicketDetailsPanel, getPropsAreEqual(['ticket', 'cacheId']));
