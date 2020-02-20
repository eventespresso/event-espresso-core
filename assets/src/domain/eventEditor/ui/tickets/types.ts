import { EntityId } from '../../services/apollo/types';
import { ActionsMenuItemProps } from '@appLayout/entityActionsMenu';

export interface EditTicketProps {
	position?: string;
	relatedDates?: EntityId[];
}
export interface EditTicketModalProps {
	relatedDates: EntityId[];
}

export interface TicketItemFormProps {
	id?: EntityId;
	title?: string;
	formReset?: boolean;
}

export interface AdditionalTicketMenuOptions {
	ticketMenuItemProps?: ActionsMenuItemProps;
}
