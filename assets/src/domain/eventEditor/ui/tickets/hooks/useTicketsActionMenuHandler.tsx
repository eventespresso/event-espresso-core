import React, { useCallback } from 'react';

import EditTicketButton from '../ticketCard/EditTicketButton';
import { EspressoButton } from '@application/ui/input';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { SubscriptionCallback, TicketMenuKey } from '../../entityActionMenu';
import { Ticket } from '../../../services/apollo/types';

type TicketsSubscriptionCallback = SubscriptionCallback<Ticket, TicketMenuKey>;

const useTicketsActionMenuHandler = (): TicketsSubscriptionCallback => {
	return useCallback<TicketsSubscriptionCallback>(({ entity: ticket }, { registerMenuItem }) => {
		registerMenuItem('editTicket', () => <EditTicketButton key={ticket.id + 'editTicket'} />);

		registerMenuItem('assignDates', () => (
			<EspressoButton
				icon='form'
				onClick={() => console.log('You clicked TAM')}
				key={ticket.id + 'assignDates'}
			/>
		));

		registerMenuItem('tpc', () => <TicketPriceCalculatorButton ticketId={ticket.id} key={ticket.id + 'tpc'} />);
	}, []);
};

export default useTicketsActionMenuHandler;
