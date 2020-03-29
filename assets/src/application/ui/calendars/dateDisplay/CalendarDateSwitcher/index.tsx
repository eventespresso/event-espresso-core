import React from 'react';
import { parseISO } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { BiggieCalendarDate, CalendarDateRange } from '../';
import { CalendarDateSwitcherProps } from './types';
import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import switchTenseForDate from '@sharedServices/utils/switchTenseForDate';

const headerFuture = 'sale starts';
const headerPast = 'sale started';
const footerFuture = 'sale ends';
const footerPast = 'sale ended';

const CalendarDateSwitcher: React.FC<CalendarDateSwitcherProps> = React.memo(
	({ className, displayDate = DisplayStartOrEndDate.start, ...props }) => {
		const startDate = parseISO(props.startDate) || PLUS_ONE_MONTH;
		const endDate = parseISO(props.endDate) || PLUS_TWO_MONTHS;
		const { footerText, headerText } = switchTenseForDate({
			endDate: props.endDate,
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: props.startDate,
		});

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
