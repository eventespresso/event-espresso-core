import { Datetime } from '@edtrServices/apollo/types';
import { DatetimesToShow } from '@edtrServices/filterState';

export type DatetimeFilterFn = (dates: Array<Datetime>) => Array<Datetime>;

export interface FilterDates {
	dates: Datetime[];
	show: DatetimesToShow;
}
