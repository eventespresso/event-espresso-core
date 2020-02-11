import React from 'react';
import { format, isValid } from 'date-fns';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import './style.css';
import { CalendarDateProps, CalendarPosition } from '../types';

export interface MediumCalendarDateProps extends CalendarDateProps {
	date: Date;
	addWrapper?: boolean;
}

/**
 * Displays a full calendar date... just not so bigly
 *
 * @function
 * @param {DateTime} date
 * @param {string} headerText
 * @param {string} footerText
 * @param {string} htmlClass
 * @param {string} position
 * @param {boolean} addWrapper
 * @param {boolean} showTime
 * @return {string} rendered date
 */
const MediumCalendarDate: React.FC<MediumCalendarDateProps> = ({
	date,
	headerText,
	footerText,
	htmlClass = '',
	position = CalendarPosition.LEFT,
	addWrapper = false,
	showTime = false,
}) => {
	if (!isValid(date)) {
		return null;
	}
	const classes = classNames(htmlClass, 'ee-medium-calendar-date-wrapper', {
		'ee-mcd-pos-left': position === CalendarPosition.LEFT,
		'ee-mcd-pos-right': position !== CalendarPosition.LEFT,
	});
	const mediumDate = (
		<>
			{headerText && <div className='ee-medium-calendar-date-header'>{headerText}</div>}
			<div className='ee-medium-calendar-date'>
				<div className='ee-mcd-weekday'>{format(date, 'eeee')}</div>
				<div className='ee-mcd-month-day'>
					<span className='ee-mcd-month'>{format(date, 'MMM')}</span>
					<span className='ee-mcd-day'>{format(date, 'ee')}</span>
				</div>
				<div className='ee-mcd-year'>
					{format(date, 'YYYY')}
					{showTime && <span className='ee-mcd-time'>&nbsp;{format(date, 'h:mm a')}</span>}
				</div>
				{footerText && <div className='ee-medium-calendar-date-footer'>{footerText}</div>}
			</div>
		</>
	);
	return addWrapper ? <div className={classes}>{mediumDate}</div> : mediumDate;
};

export default MediumCalendarDate;
