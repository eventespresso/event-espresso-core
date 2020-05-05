import { Datetime } from '@edtrServices/apollo/types';

export interface DateMainMenuProps {
	copyDate?: VoidFunction;
	datetime?: Datetime;
	editDate?: VoidFunction;
	onClick?: VoidFunction;
	trashed?: boolean;
}
