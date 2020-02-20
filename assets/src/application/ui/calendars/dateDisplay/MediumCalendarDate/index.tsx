import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { __ } from '@wordpress/i18n';

import './style.css';
import { CalendarDateProps } from '../types';

import {
	DAY_ONLY_SHORT_FORMAT,
	MONTH_ONLY_LONG_FORMAT,
	TIME_ONLY_12H_SHORT_FORMAT,
	WEEKDAY_ONLY_FULL_FORMAT,
	YEAR_ONLY_LONG_FORMAT,
} from '@appConstants/dateFnsFormats';

export interface MediumCalendarDateProps extends CalendarDateProps {
	date: Date;
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
	const dateObject = date instanceof Date ? date : parseISO(date);
	if (!isValid(dateObject)) {
		return null;
	}
	className += ' ee-medium-calendar-date-wrapper';
	const mediumDate = (
		<>
			{headerText && <div className='ee-medium-calendar-date-header'>{headerText}</div>}
			<div className='ee-medium-calendar-date'>
				<div className='ee-mcd-weekday'>{format(dateObject, WEEKDAY_ONLY_FULL_FORMAT)}</div>
				<div className='ee-mcd-month-day'>
					<span className='ee-mcd-month'>{format(dateObject, MONTH_ONLY_LONG_FORMAT)}</span>
					<span className='ee-mcd-day'>{format(dateObject, DAY_ONLY_SHORT_FORMAT)}</span>
				</div>
				<div className='ee-mcd-year'>
					{format(dateObject, YEAR_ONLY_LONG_FORMAT)}
					{showTime && (
						<span className='ee-mcd-time'>&nbsp;{format(dateObject, TIME_ONLY_12H_SHORT_FORMAT)}</span>
					)}
				</div>
				{footerText && <div className='ee-medium-calendar-date-footer'>{footerText}</div>}
			</div>
		</>
	);
	return addWrapper ? <div className={className}>{mediumDate}</div> : mediumDate;
};
