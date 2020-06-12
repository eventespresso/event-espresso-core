import { DateAndTime } from '@sharedServices/utils/dateAndTime';
import { UpdateTicketInput } from '@edtrServices/apollo/mutations';

export interface TicketFormShape extends UpdateTicketInput, DateAndTime {
	dateTime?: DateAndTime;
}
