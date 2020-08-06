import { DisplayStartOrEndDate } from '@sharedServices/filterState';

export interface CalendarDateLabels {
	header?: string;
	headerPast?: string;
	headerFuture?: string;
	footer?: string;
	footerPast?: string;
	footerFuture?: string;
}

export interface CalendarDateSwitcherProps {
	className?: string;
	displayDate: DisplayStartOrEndDate;
	endDate: string;
	labels: CalendarDateLabels;
	showDate?: boolean;
	startDate: string;
}
