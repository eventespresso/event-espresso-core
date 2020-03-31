import { DisplayStartOrEndDate } from '@sharedServices/filterState';

interface CalendarDateLabels {
	headerPast?: string;
	headerFuture?: string;
	footerPast?: string;
	footerFuture?: string;
}

export interface CalendarDateSwitcherProps {
	className?: string;
	displayDate: DisplayStartOrEndDate;
	endDate: string;
	labels?: CalendarDateLabels;
	showDate?: boolean;
	startDate: string;
}
