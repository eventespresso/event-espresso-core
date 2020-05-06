import { FormModalProps } from '@application/ui/layout/formModal';
import { EntityId, EntityDbId } from '@dataServices/types';

export type FormModals = {
	addDatetime: FormModalProps;
	editDatetime: FormModalProps;
	addTicket: FormModalProps;
	editTicket: FormModalProps;
};

export interface FormModalsHookProps {
	entityId?: EntityId;
	entityDbId?: EntityDbId;
}

export type FormModalsHook = (props: FormModalsHookProps) => FormModals;
