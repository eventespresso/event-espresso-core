import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import EditTicketButton from '../ticketsList/actionsMenu/EditTicketButton';
import DeleteTicketButton from '../ticketsList/actionsMenu/DeleteTicketButton';
import AssignDatesButton from '../ticketsList/actionsMenu/AssignDatesButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { EntityActionsSubscriptionCb } from '@appLayout/entityActionsMenu';
import { Ticket } from '@edtrServices/apollo/types';

type TicketsSubscriptionCallback = EntityActionsSubscriptionCb<Ticket, 'ticket'>;

const useTicketsActionMenuHandler = (): TicketsSubscriptionCallback => {
	return useCallback<TicketsSubscriptionCallback>(({ entity: ticket, registry }) => {
		const { registerElement: registerMenuItem } = registry;

		registerMenuItem('editTicket', () => <EditTicketButton />);

		registerMenuItem('assignDates', () => <AssignDatesButton id={ticket.id} />);

		registerMenuItem('ticketPriceCalculator', () => <TicketPriceCalculatorButton ticketId={ticket.id} />);

		registerMenuItem('deleteTicket', () => <DeleteTicketButton id={ticket.id} />);
	}, []);
};

export default useTicketsActionMenuHandler;
