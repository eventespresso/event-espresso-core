import React from 'react';
import classNames from 'classnames';
import { differenceInCalendarDays, parseISO, isValid } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { useTimeZoneTime } from '@appServices/hooks';
import { BiggieCalendarDate, MediumCalendarDate, CalendarDateProps } from '../index';
import { TIME_ONLY_12H_SHORT_FORMAT } from '@appConstants/dateFnsFormats';
import './style.scss';

interface CalendarDateRangeProps extends CalendarDateProps {
	startDate: string;
	endDate: string;
}

/**
 * Displays a pair of calendar dates representing a date range
 */
export const CalendarDateRange: React.FC<CalendarDateRangeProps> = ({
	className = '',
	endDate,
	footerText = '',
	headerText = '',
	showTime = true,
	startDate,
}) => {
	const { formatForSite: format } = useTimeZoneTime();

	if (!isValid(parseISO(startDate)) || !isValid(parseISO(endDate))) {
		return null;
	}

	if (differenceInCalendarDays(parseISO(startDate), parseISO(endDate)) !== 0) {
		const htmlClassName = classNames(className, 'ee-calendar-date-range-wrapper');
		return (
			<div className={htmlClassName}>
				<div className={'ee-calendar-date-range'}>
					<MediumCalendarDate date={date} key={'start-date'} showTime={showTime} />
					<div className={'ee-calendar-date-range__divider'}>{__('to')}</div>
					<MediumCalendarDate date={date} key={'end-date'} showTime={showTime} />
				</div>
				{footerText && <div className={'ee-calendar-date-range__footer'}>{footerText}</div>}
			</div>
		);
	}
	const time = format(startDate, TIME_ONLY_12H_SHORT_FORMAT + ' - ') + format(endDate, TIME_ONLY_12H_SHORT_FORMAT);
	const headerTxt = headerText ? headerText : <span>&nbsp;</span>;

	return (
		<BiggieCalendarDate
			date={startDate}
			className={className}
			headerText={headerTxt}
			footerText={[time, footerText]}
		/>
	);
};
