import React from 'react';
import classNames from 'classnames';
import { parseISO } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import { BiggieCalendarDate, CalendarDateRange } from '../';

interface Props {
	className?: string;
	displayDate: DisplayStartOrEndDate;
	endDate: string;
	footerText?: string;
	headerPrefix?: string;
	headerText?: string;
	showDate?: boolean;
	startDate: string;
}

const CalendarDateSwitcher: React.FC<Props> = React.memo(
	({
		className,
		displayDate = DisplayStartOrEndDate.start,
		footerText,
		headerPrefix,
		headerText,

		...props
	}) => {
		const startDate = parseISO(props.startDate) || PLUS_ONE_MONTH;
		const endDate = parseISO(props.endDate) || PLUS_TWO_MONTHS;

		switch (displayDate) {
			case 'end':
				return (
					<BiggieCalendarDate
						className={className}
						date={endDate}
						headerText={`${headerPrefix || ''}${headerText || __('ends')}`}
						footerText={footerText}
					/>
				);
			case 'both':
				return (
					<CalendarDateRange
						className={className}
						endDate={endDate}
						footerText={footerText}
						headerText={headerText}
						showTime
						startDate={startDate}
					/>
				);
			case 'start':
				return (
					<BiggieCalendarDate
						className={className}
						date={startDate}
						footerText={footerText}
						headerText={`${headerPrefix || ''}${headerText || __('starts')}`}
					/>
				);
			default:
				return (
					<BiggieCalendarDate
						className={className}
						date={startDate}
						footerText={footerText}
						headerText={`${headerPrefix || ''}${headerText || __('starts')}`}
					/>
				);
		}
	}
);

export default CalendarDateSwitcher;
