import { Ticket, EntityId } from '../data/types';

export interface EditDateProps {
	id: EntityId;
	position?: string;
	relatedTickets?: EntityId[];
}
export interface EditDateModalProps {
	id: EntityId;
	relatedTickets: EntityId[];
}

export interface DateItemFormProps {
	tickets: Ticket[];
	relatedTickets: EntityId[];
	title?: string;
	formReset?: boolean;
}
