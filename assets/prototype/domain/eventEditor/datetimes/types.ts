import { Ticket, EntityId } from '../data/types';
import { EditItemModalProps, EditItemFormProps, ListItemProps } from '../types';
import { DatesSortedBy, DisplayDates, ShowDates } from '../data/date/types';

export interface EditDateProps extends ListItemProps {
	position?: string;
	relatedTickets?: EntityId[];
}
export interface EditDateModalProps extends EditItemModalProps {
	relatedTickets: EntityId[];
}

export interface DateItemFormProps extends EditItemFormProps {
	tickets: Ticket[];
	relatedTickets: EntityId[];
}

export interface DatesSortedByControlProps {
	datesSortedBy: DatesSortedBy;
	setDatesSortedBy: (datesSortedBy: DatesSortedBy) => void;
}

export interface DisplayDatesControlProps {
	displayDates: DisplayDates;
	setDisplayDates: (displayDates: DisplayDates) => void;
}

export interface ShowDatesControlProps {
	showDates: ShowDates;
	setShowDates: (showDates: ShowDates) => void;
}
