import { DisplayStartOrEndDate } from '@sharedServices/filterState';

interface CalendarDateLabels {
	headerPast: string; // sale starts
	headerFuture: string; // sale started
	footerPast: string; // sale ends
	footerFuture: string; // sale ended
}

export interface CalendarDateSwitcherProps {
	className?: string;
	displayDate: DisplayStartOrEndDate;
	endDate: string;
	labels?: CalendarDateLabels;
	showDate?: boolean;
	startDate: string;
}
