import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import EditTicketButton from '../ticketsList/actionsMenu/EditTicketButton';
import DeleteTicketButton from '../ticketsList/actionsMenu/DeleteTicketButton';
import AssignDatesButton from '../ticketsList/actionsMenu/AssignDatesButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { EntitySubscriptionCallback } from '@appLayout/entityActionsMenu';
import { Ticket } from '@edtrServices/apollo/types';
import { AdditionalTicketMenuOptions } from '../types';
import { useStatus, TypeName } from '@appServices/apollo/status';

type TicketsSubscriptionCallback = EntitySubscriptionCallback<Ticket, AdditionalTicketMenuOptions>;

const useTicketsActionMenuHandler = (): TicketsSubscriptionCallback => {
	return useCallback<TicketsSubscriptionCallback>(({ entity: ticket }, { registerMenuItem }) => {
		registerMenuItem('editTicket', () => <EditTicketButton key={ticket.id + 'editTicket'} />);

		registerMenuItem('assignDates', () => <AssignDatesButton id={ticket.id} />);

		registerMenuItem('ticketPriceCalculator', () => {
			const { isLoaded } = useStatus();
			/* Hide price calculator unless prices are loaded */
			return isLoaded(TypeName.prices) && <TicketPriceCalculatorButton ticketId={ticket.id} />;
		});

		registerMenuItem('deleteTicket', () => {
			const { isLoaded } = useStatus();
			/* Delete button should be hidden to avoid relational inconsistencies */
			return isLoaded(TypeName.prices) && <DeleteTicketButton id={ticket.id} />;
		});
	}, []);
};

export default useTicketsActionMenuHandler;
