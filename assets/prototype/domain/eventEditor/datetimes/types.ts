import { Ticket, EntityId } from '../data/types';

export interface EditDateProps {
	position?: string;
	relatedTickets?: EntityId[];
}
export interface EditDateModalProps {
	relatedTickets: EntityId[];
}

export interface DateItemFormProps {
	tickets: Ticket[];
	relatedTickets: EntityId[];
	title?: string;
	formReset?: boolean;
}
