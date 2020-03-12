import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import EditTicketButton from '../ticketsList/actionsMenu/EditTicketButton';
import DeleteTicketButton from '../ticketsList/actionsMenu/DeleteTicketButton';
import AssignDatesButton from '../ticketsList/actionsMenu/AssignDatesButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { EntityActionsSubscriptionCb } from '@appLayout/entityActionsMenu';
import { Ticket } from '@edtrServices/apollo/types';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';

type TicketsSubscriptionCallback = EntityActionsSubscriptionCb<Ticket, 'ticket'>;

const useTicketsActionMenuHandler = (): TicketsSubscriptionCallback => {
	return useCallback<TicketsSubscriptionCallback>(({ entity: ticket }, { registerMenuItem }) => {
		const withPricesLoaded = withIsLoaded(TypeName.prices);
		const withDatesLoaded = withIsLoaded(TypeName.datetimes);

		registerMenuItem('editTicket', () => <EditTicketButton key={ticket.id + 'editTicket'} />);

		registerMenuItem(
			'assignDates',
			withDatesLoaded(({ loaded }) => {
				/* Hide TAM unless dates are loaded */
				return loaded && <AssignDatesButton id={ticket.id} />;
			})
		);

		registerMenuItem(
			'ticketPriceCalculator',
			withPricesLoaded(({ loaded }) => {
				/* Hide price calculator unless prices are loaded */
				return loaded && <TicketPriceCalculatorButton ticketId={ticket.id} />;
			})
		);

		registerMenuItem(
			'deleteTicket',
			withDatesLoaded(
				withPricesLoaded(({ loaded }) => {
					/* Delete button should be hidden to avoid relational inconsistencies */
					return loaded && <DeleteTicketButton id={ticket.id} />;
				})
			)
		);
	}, []);
};

export default useTicketsActionMenuHandler;
