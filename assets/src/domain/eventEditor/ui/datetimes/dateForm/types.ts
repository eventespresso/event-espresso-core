import { UpdateDatetimeInput } from '@edtrServices/apollo/mutations';
import { DateAndTime } from '@sharedServices/utils/dateAndTime';

export interface DateFormShape extends UpdateDatetimeInput, DateAndTime {
	dateTime?: DateAndTime;
}
