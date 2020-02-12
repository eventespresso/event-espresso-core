import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { __ } from '@wordpress/i18n';

import './style.css';
import { CalendarDateProps } from '../types';

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
				<div className='ee-mcd-weekday'>{format(dateObject, 'eeee')}</div>
				<div className='ee-mcd-month-day'>
					<span className='ee-mcd-month'>{format(dateObject, 'MMM')}</span>
					<span className='ee-mcd-day'>{format(dateObject, 'ee')}</span>
				</div>
				<div className='ee-mcd-year'>
					{format(dateObject, 'YYYY')}
					{showTime && <span className='ee-mcd-time'>&nbsp;{format(dateObject, 'h:mm a')}</span>}
				</div>
				{footerText && <div className='ee-medium-calendar-date-footer'>{footerText}</div>}
			</div>
		</>
	);
	return addWrapper ? <div className={className}>{mediumDate}</div> : mediumDate;
};
