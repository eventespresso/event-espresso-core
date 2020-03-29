import { parseISO } from 'date-fns';

import { diff } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';

interface CalendarDateLabels {
	headerPast: string;
	headerFuture: string;
	footerPast: string;
	footerFuture: string;
}

interface SwitchTenseForDate extends CalendarDateLabels {
	endDate: string; // ISO string
	startDate: string; // ISO string
}

const switchTenseForDate = ({
	endDate,
	footerFuture,
	footerPast,
	headerFuture,
	headerPast,
	startDate,
}: SwitchTenseForDate): { footerText: string; headerText: string } => {
	const headerText = diff('minutes', parseISO(startDate), now) < 0 ? headerPast : headerFuture;
	const footerText = diff('minutes', parseISO(endDate), now) < 0 ? footerPast : footerFuture;

	return { footerText, headerText };
};

export default switchTenseForDate;
