import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import AssignDatesButton from '../ticketsList/actionsMenu/AssignDatesButton';
import { TicketMainMenu } from '../ticketsList/actionsMenu/dropdown';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { EntityActionsSubscriptionCb } from '@appLayout/entityActionsMenu';
import { Ticket } from '@edtrServices/apollo/types';

type TicketsSubscriptionCallback = EntityActionsSubscriptionCb<Ticket, 'ticket'>;

const useTicketsActionMenuHandler = (): TicketsSubscriptionCallback => {
	return useCallback<TicketsSubscriptionCallback>(({ entity: ticket, registry }) => {
		const { registerElement: registerMenuItem } = registry;

		registerMenuItem('ticketMainMenu', () => <TicketMainMenu id={ticket.id} />);

		registerMenuItem('assignDates', () => <AssignDatesButton entity={ticket} />);

		registerMenuItem('ticketPriceCalculator', () => <TicketPriceCalculatorButton ticketId={ticket.id} />);
	}, []);
};

export default useTicketsActionMenuHandler;
