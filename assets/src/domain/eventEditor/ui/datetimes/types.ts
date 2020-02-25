import { EntityId } from '@edtrServices/apollo/types';
import { ActionsMenuItemProps } from '@appLayout/entityActionsMenu';

export interface EditDateProps {
	position?: string;
	relatedTickets?: EntityId[];
}
export interface EditDateModalProps {
	relatedTickets: EntityId[];
}

export interface DateItemFormProps {
	id?: EntityId;
	title?: string;
	formReset?: boolean;
}

export interface AdditionalDateMenuOptions {
	dateMenuItemProps?: ActionsMenuItemProps;
}
