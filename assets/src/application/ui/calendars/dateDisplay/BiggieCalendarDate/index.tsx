import { format, parseISO, isValid } from 'date-fns';
import React, { useCallback } from 'react';

import { EspressoButton } from '@application/ui/input/EspressoButton';
import {
	DAY_ONLY_SHORT_FORMAT,
	MONTH_ONLY_FULL_FORMAT,
	TIME_ONLY_12H_SHORT_FORMAT,
	WEEKDAY_ONLY_FULL_FORMAT,
	YEAR_ONLY_LONG_FORMAT,
} from '@appConstants/dateFnsFormats';
import { CalendarDateProps } from '../types';
import './style.css';

export interface BiggieCalendarDateProps extends CalendarDateProps {
	date: Date | string;
}

/**
 * Displays a full calendar date, but REALLY BIG!!!
 */
export const BiggieCalendarDate: React.FC<BiggieCalendarDateProps> = ({
	date,
	className,
	headerText,
	footerText,
	onEdit = null,
	editButton = {},
	showTime = false,
}) => {
	const onEditHandler = useCallback((event) => onEdit(event), [onEdit]);
	const dateObject = date instanceof Date ? date : parseISO(date);
	if (!isValid(dateObject)) {
		return null;
	}
	className += ' ee-biggie-calendar-date-bg';

	const editDateButton = typeof onEdit === 'function' && (
		<EspressoButton
			className='ee-edit-calendar-date-btn'
			onClick={onEditHandler}
			onKeyPress={onEditHandler}
			tooltip={editButton.tooltip}
			labelPosition={editButton.tooltipPosition}
			icon='calendar'
		/>
	);

	return (
		<div className={className}>
			{headerText && <div className='ee-biggie-calendar-date-header'>{headerText}</div>}
			<div className='ee-biggie-calendar-date'>
				<div className='ee-bcd-weekday'>{format(dateObject, WEEKDAY_ONLY_FULL_FORMAT)}</div>
				<div className='ee-bcd-month'>{format(dateObject, MONTH_ONLY_FULL_FORMAT)}</div>
				<div className='ee-bcd-month-day-sep'></div>
				<div className='ee-bcd-day'>{format(dateObject, DAY_ONLY_SHORT_FORMAT)}</div>
				<div className='ee-bcd-year'>{format(dateObject, YEAR_ONLY_LONG_FORMAT)}</div>
				{showTime && <div className='ee-bcd-time'>{format(dateObject, TIME_ONLY_12H_SHORT_FORMAT)}</div>}
			</div>
			{footerText && <div className='ee-biggie-calendar-date-footer'>{footerText}</div>}
			{editDateButton}
		</div>
	);
};
