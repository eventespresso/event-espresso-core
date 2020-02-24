import { DateAndTime } from '../../../../shared/services/utils/dateAndTime';
import { TicketBaseInput } from '@edtrServices/apollo/mutations';

export interface TicketFormShape extends TicketBaseInput, DateAndTime {
	dateTime?: DateAndTime;
}
