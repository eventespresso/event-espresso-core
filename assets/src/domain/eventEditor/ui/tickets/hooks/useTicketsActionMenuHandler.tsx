import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import EditTicketButton from '../ticketCard/EditTicketButton';
import DeleteTicketButton from '../ticketCard/DeleteTicketButton';
import { EspressoButton } from '@application/ui/input';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import { EntitySubscriptionCallback, EntityType, MenuKey } from '@appLayout/entityActionsMenu';
import { Ticket } from '../../../services/apollo/types';
import { AdditionalTicketMenuOptions } from '../types';
import { useStatus, TypeName } from '@appServices/apollo/status';

type TicketsSubscriptionCallback = EntitySubscriptionCallback<Ticket, EntityType, MenuKey, AdditionalTicketMenuOptions>;

const useTicketsActionMenuHandler = (): TicketsSubscriptionCallback => {
	return useCallback<TicketsSubscriptionCallback>(
		({ entity: ticket }, { registerMenuItem }, { ticketMenuItemProps: menuItemProps }) => {
			registerMenuItem('editTicket', () => (
				<EditTicketButton key={ticket.id + 'editTicket'} {...menuItemProps} />
			));

			registerMenuItem('assignDates', () => (
				<EspressoButton
					icon='calendar'
					onClick={() => console.log('You clicked TAM')}
					tooltip={__('assign dates')}
					tooltipProps={{ placement: 'left' }}
					{...menuItemProps}
				/>
			));

			registerMenuItem('ticketPriceCalculator', () => {
				const { isLoaded } = useStatus();
				/* Hide price calculator unless prices are loaded */
				return (
					isLoaded(TypeName.prices) && <TicketPriceCalculatorButton ticketId={ticket.id} {...menuItemProps} />
				);
			});

			registerMenuItem('deleteTicket', () => {
				const { isLoaded } = useStatus();
				/* Delete button should be hidden to avoid relational inconsistencies */
				return isLoaded(TypeName.prices) && <DeleteTicketButton id={ticket.id} {...menuItemProps} />;
			});
		},
		[]
	);
};

export default useTicketsActionMenuHandler;
