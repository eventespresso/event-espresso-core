import { EntityId } from '@appServices/apollo/types';
import { Price } from '@edtrServices/apollo';

export interface BaseProps {
	ticketId: EntityId;
}

export type TicketPriceCalculatorModalHook = (props: BaseProps) => TicketPriceCalculatorModal;

export interface TicketPriceCalculatorModal {
	openModal: VoidFunction;
}

export interface TpcPriceModifier extends Price {
	priceType: EntityId;
	priceTypeOrder: number | string;
	isNew?: boolean;
}

export interface PriceModifierProps {
	price: TpcPriceModifier;
	index?: number;
}
