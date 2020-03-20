import { EntityId } from '@appServices/apollo/types';

export interface BaseProps {
	ticketId: EntityId;
}

export type TicketPriceCalculatorModalHook = (props: BaseProps) => TicketPriceCalculatorModal;

export interface TicketPriceCalculatorModal {
	openModal: VoidFunction;
}
