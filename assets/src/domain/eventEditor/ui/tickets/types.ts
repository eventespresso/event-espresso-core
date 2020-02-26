import { ActionsMenuItemProps } from '@appLayout/entityActionsMenu';
import { EntityId } from '@appServices/apollo/types';

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
