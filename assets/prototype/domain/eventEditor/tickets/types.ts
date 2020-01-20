import { Datetime, EntityId } from '../data/types';

export interface EditTicketProps {
	position?: string;
	relatedDates?: EntityId[];
}
export interface EditTicketModalProps {
	relatedDates: EntityId[];
}

export interface TicketItemFormProps {
	datetimes: Datetime[];
	relatedDates: EntityId[];
	title?: string;
	formReset?: boolean;
}
