import React from 'react';
import { differenceInCalendarDays, format, parseISO, isValid } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { BiggieCalendarDate, MediumCalendarDate, CalendarDateProps } from '../index';
import { TIME_ONLY_12H_SHORT_FORMAT } from '@appConstants/date-fns-formats';

export interface CalendarDateRange extends CalendarDateProps {
	startDate: Date;
	endDate: Date;
}

/**
 * Displays a pair of calendar dates representing a date range
 */
export const CalendarDateRange: React.FC<CalendarDateRange> = ({
	startDate,
	endDate,
	headerText = '',
	footerText = '',
	className = '',
	showTime = false,
}) => {
	const startDateObject = startDate instanceof Date ? startDate : parseISO(startDate);
	const endDateObject = endDate instanceof Date ? endDate : parseISO(endDate);
	if (!isValid(startDateObject) || !isValid(endDateObject)) {
		return null;
	}
	if (differenceInCalendarDays(startDateObject, endDateObject) !== 0) {
		return (
			<MediumCalendarDate
				date={startDateObject}
				className={className}
				showTime={showTime}
				addWrapper
				footerText={
					<MediumCalendarDate
						key={'end-date'}
						date={endDateObject}
						headerText={__('to', 'event_espresso')}
						showTime={showTime}
						footerText={footerText}
					/>
				}
			/>
		);
	}
	const time =
		format(startDateObject, TIME_ONLY_12H_SHORT_FORMAT + ' - ') + format(endDateObject, TIME_ONLY_12H_SHORT_FORMAT);
	const headerTxt = headerText ? headerText : <span>&nbsp;</span>;
	return (
		<BiggieCalendarDate
			date={startDateObject}
			className={className}
			headerText={headerTxt}
			footerText={[time, footerText]}
		/>
	);
};
