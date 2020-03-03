import { FormModalProps } from '@application/ui/layout/formModal';
import { EntityId } from '@appServices/apollo/types';

export type FormModals = {
	addDatetime: FormModalProps;
	editDatetime: FormModalProps;
	addTicket: FormModalProps;
	editTicket: FormModalProps;
	ticketPriceCalculator: FormModalProps;
};

export type FormModalsHook = (entityId: EntityId) => FormModals;
