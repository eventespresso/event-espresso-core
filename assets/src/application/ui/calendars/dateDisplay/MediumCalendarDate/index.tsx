import React from 'react';
import classNames from 'classnames';
import { parseISO, isValid } from 'date-fns';
import { __ } from '@wordpress/i18n';
import TimezoneTimeInfo from '../TimezoneTimeInfo';
import { useTimeZoneTime } from '@appServices/hooks';

import './style.scss';
import { CalendarDateProps } from '../types';

import {
	DAY_ONLY_SHORT_FORMAT,
	MONTH_ONLY_LONG_FORMAT,
	TIME_ONLY_12H_SHORT_FORMAT,
	WEEKDAY_ONLY_FULL_FORMAT,
	YEAR_ONLY_LONG_FORMAT,
} from '@appConstants/dateFnsFormats';

export interface MediumCalendarDateProps extends CalendarDateProps {
	date: string;
	addWrapper?: boolean;
}

/**
 * Displays a full calendar date... just not so bigly
 */
export const MediumCalendarDate: React.FC<MediumCalendarDateProps> = ({
	date,
	headerText,
	footerText,
	className = '',
	addWrapper = false,
	showTime = false,
}) => {
	const { formatForSite: format } = useTimeZoneTime();

	if (!isValid(parseISO(date))) {
		return null;
	}
	const htmlClassName = classNames(className, 'ee-medium-calendar-date__wrapper');
	const mediumDate = (
		<>
			{headerText && <div className='ee-medium-calendar-date__header'>{headerText}</div>}
			<div className='ee-medium-calendar-date'>
				<div className='ee-mcd__weekday'>{format(date, WEEKDAY_ONLY_FULL_FORMAT)}</div>
				<div className='ee-mcd__month-day'>
					<span className='ee-mcd__month'>{format(date, MONTH_ONLY_LONG_FORMAT)}</span>
					<span className='ee-mcd__day'>{format(date, DAY_ONLY_SHORT_FORMAT)}</span>
				</div>
				<div className='ee-mcd__year'>
					{format(date, YEAR_ONLY_LONG_FORMAT)}
					<TimezoneTimeInfo date={parseISO(date)} inline />
					{showTime && <span className='ee-mcd__time'>{format(date, TIME_ONLY_12H_SHORT_FORMAT)}</span>}
				</div>
			</div>
			{footerText && <div className='ee-medium-calendar-date__footer'>{footerText}</div>}
		</>
	);
	return addWrapper ? <div className={htmlClassName}>{mediumDate}</div> : mediumDate;
};
