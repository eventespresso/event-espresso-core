import { Datetime } from '@edtrServices/apollo/types';
import { Sales, Status } from '@edtrServices/filterState';

export type DatetimeFilterFn = (dates: Array<Datetime>) => Array<Datetime>;

export interface SalesFilter {
	dates: Datetime[];
	sales: Sales;
}

export interface StatusFilter {
	dates: Datetime[];
	status: Status;
}
