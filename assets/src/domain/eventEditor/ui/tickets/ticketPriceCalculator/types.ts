import React from 'react';
import { EntityId } from '@dataServices/types';
import { Price } from '@edtrServices/apollo';

export interface BaseProps {
	ticketId: EntityId;
}

export interface ModalContainerProps extends BaseProps, Omit<Disclosure, 'onOpen'> {}

export interface Disclosure {
	isOpen: boolean;
	onOpen: VoidFunction;
	onClose: VoidFunction;
}

export interface TicketPriceCalculator extends Disclosure {
	ModalContainer: React.FC<ModalContainerProps>;
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
