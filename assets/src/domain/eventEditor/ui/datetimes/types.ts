import { EntityId } from '@appServices/apollo/types';

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
