import React, { useCallback } from 'react';

import EditTicketButton from '../tickets/ticketCard/EditTicketButton';
import { EspressoButton } from '@application/ui/input';
import TicketPriceCalculatorButton from '../tickets/ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { Ticket } from '../../services/apollo/types';
import { TicketMenuKey, EntityActionsMenuCallback } from './types';

export type TicketActionsMenuCallback = EntityActionsMenuCallback<Ticket, TicketMenuKey>;

const useAddTicketActionMenuItems = (): TicketActionsMenuCallback => {
	return useCallback<TicketActionsMenuCallback>((ticket, { registerMenuItem }) => {
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

export default useAddTicketActionMenuItems;
