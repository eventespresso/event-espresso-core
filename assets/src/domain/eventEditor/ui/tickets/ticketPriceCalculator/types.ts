import React from 'react';
import { EntityId } from '@appServices/apollo/types';
import { Price } from '@edtrServices/apollo';

export interface BaseProps {
	ticketId: EntityId;
}

export type TicketPriceCalculatorModalHook = () => TicketPriceCalculatorModal;

export interface TicketPriceCalculatorModal {
	openModal: VoidFunction;
	Container: React.FC<BaseProps>;
}

export interface TpcPriceModifier extends Price {
	priceType: EntityId;
	priceTypeOrder: number | string;
	isNew?: boolean;
	isModified?: boolean;
}

export interface PriceModifierProps {
	price: TpcPriceModifier;
	index?: number;
}
