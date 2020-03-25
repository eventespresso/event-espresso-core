import React from 'react';
import classNames from 'classnames';
import { differenceInCalendarDays, parseISO, isValid } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { useTimeZoneTime } from '@appServices/hooks';
import { BiggieCalendarDate, MediumCalendarDate, CalendarDateProps } from '../index';
import { TIME_ONLY_12H_SHORT_FORMAT } from '@appConstants/dateFnsFormats';
import './style.scss';

export interface CalendarDateRangeProps extends CalendarDateProps {
	startDate: Date | string;
	endDate: Date | string;
}

/**
 * Displays a pair of calendar dates representing a date range
 */
export const CalendarDateRange: React.FC<CalendarDateRangeProps> = ({
	startDate,
	endDate,
	headerText = '',
	footerText = '',
	className = '',
	showTime = true,
}) => {
	const { formatForSite: format } = useTimeZoneTime();

	const startDateObject = startDate instanceof Date ? startDate : parseISO(startDate);
	const endDateObject = endDate instanceof Date ? endDate : parseISO(endDate);
	if (!isValid(startDateObject) || !isValid(endDateObject)) {
		return null;
	}
	if (differenceInCalendarDays(startDateObject, endDateObject) !== 0) {
		const htmlClassName = classNames(className, 'ee-calendar-date-range-wrapper');
		return (
			<div className={htmlClassName}>
				<div className={'ee-calendar-date-range'}>
					<MediumCalendarDate date={startDateObject} key={'start-date'} showTime={showTime} />
					<div className={'ee-calendar-date-range__divider'}>{__('to')}</div>
					<MediumCalendarDate date={endDateObject} key={'end-date'} showTime={showTime} />
				</div>
				{footerText && <div className={'ee-calendar-date-range__footer'}>{footerText}</div>}
			</div>
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
