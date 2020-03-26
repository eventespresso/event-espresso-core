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
	headerText?: string;
	showDate?: boolean;
	startDate: string;
}

const CalendarDateSwitcher: React.FC<Props> = React.memo(
	({ className, displayDate = DisplayStartOrEndDate.start, footerText, headerText, ...props }) => {
		const startDate = parseISO(props.startDate) || PLUS_ONE_MONTH;
		const endDate = parseISO(props.endDate) || PLUS_TWO_MONTHS;

		const start = (
			<BiggieCalendarDate
				className={className}
				date={startDate}
				footerText={footerText}
				headerText={headerText || __('starts')}
				showTime
			/>
		);

		switch (displayDate) {
			case 'end':
				return (
					<BiggieCalendarDate
						className={className}
						date={endDate}
						footerText={footerText}
						headerText={headerText || __('ends')}
						showTime
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
				return start;
			default:
				return start;
		}
	}
);

export default CalendarDateSwitcher;
