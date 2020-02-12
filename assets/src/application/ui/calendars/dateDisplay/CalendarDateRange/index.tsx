import React from 'react';
import { format, isValid } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { BiggieCalendarDate } from '../BiggieCalendarDate';
import { MediumCalendarDate } from '../MediumCalendarDate';
import { CalendarDateProps } from '../types';

export interface CalendarDateRange extends CalendarDateProps {
	startDate: Date;
	endDate: Date;
}

/**
 * Displays a pair of calendar dates representing a date range
 */
const CalendarDateRange: React.FC<CalendarDateRange> = ({
	startDate,
	endDate,
	headerText = '',
	footerText = '',
	htmlClass = '',
	showTime = false,
}) => {
	if (!isValid(startDate) || !isValid(endDate)) {
		return null;
	}
	if (format(startDate, 'YY-MM-DD') !== format(endDate, 'YY-MM-DD')) {
		return (
			<MediumCalendarDate
				date={startDate}
				htmlClass={htmlClass}
				showTime={showTime}
				addWrapper
				footerText={
					<MediumCalendarDate
						key={'end-date'}
						date={endDate}
						headerText={__('to', 'event_espresso')}
						showTime={showTime}
						footerText={footerText}
					/>
				}
			/>
		);
	}
	const time = format(startDate, 'h:mm a - ') + format(endDate, 'h:mm a');
	const headerTxt = headerText ? headerText : <span>&nbsp;</span>;
	return (
		<BiggieCalendarDate
			date={startDate}
			htmlClass={htmlClass}
			headerText={headerTxt}
			footerText={[time, footerText]}
		/>
	);
};

export default CalendarDateRange;
