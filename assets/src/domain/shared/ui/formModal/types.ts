import { FormModalProps } from '@application/ui/layout/formModal';
import { EntityId, EntityDbId } from '@appServices/apollo/types';

export type FormModals = {
	addDatetime: FormModalProps;
	editDatetime: FormModalProps;
	addTicket: FormModalProps;
	editTicket: FormModalProps;
	ticketPriceCalculator: FormModalProps;
};

export interface FormModalsHookProps {
	entityId?: EntityId;
	entityDbId?: EntityDbId;
}

export type FormModalsHook = (props: FormModalsHookProps) => FormModals;
