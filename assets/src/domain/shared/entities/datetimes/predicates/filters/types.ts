import { Datetime } from '@edtrServices/apollo/types';
import { DatetimeSales, DatetimeStatus } from '@edtrServices/filterState';

export type DatetimeFilterFn = (dates: Array<Datetime>) => Array<Datetime>;

export interface SalesFilter {
	dates: Datetime[];
	sales: DatetimeSales;
}

export interface StatusFilter {
	dates: Datetime[];
	status: DatetimeStatus;
}
