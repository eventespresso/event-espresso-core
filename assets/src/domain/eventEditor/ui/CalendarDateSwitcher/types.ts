import { DisplayStartOrEndDate } from '@sharedServices/filterState';

export interface CalendarDateLabels {
	headerPast: string; // sale starts
	headerFuture: string; // sale started
	footerPast: string; // sale ends
	footerFuture: string; // sale ended
}

export interface CalendarDateSwitcherProps {
	className?: string;
	displayDate: DisplayStartOrEndDate;
	endDate: string;
	footerText?: string;
	headerText?: string;
	showDate?: boolean;
	startDate: string;
}
