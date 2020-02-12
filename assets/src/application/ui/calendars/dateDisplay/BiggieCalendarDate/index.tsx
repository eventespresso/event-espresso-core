import classNames from 'classnames';
import { format, parseISO, isValid } from 'date-fns';
import React, { useCallback } from 'react';

import EspressoButton from '@appInputs/EspressoButton';
import { CalendarDateProps, CalendarPosition } from '../types';
import './style.css';

export interface BiggieCalendarDateProps extends CalendarDateProps {
	date: Date | string;
}

/**
 * Displays a full calendar date, but REALLY BIG!!!
 */
export const BiggieCalendarDate: React.FC<BiggieCalendarDateProps> = ({
	date,
	htmlClass,
	headerText,
	footerText,
	position = CalendarPosition.LEFT,
	onEdit = null,
	editButton = {},
	showTime = false,
}) => {
	const onEditHandler = useCallback((event) => onEdit(event), [onEdit]);
	const dateObject = date instanceof Date ? date : parseISO(date);
	if (!isValid(dateObject)) {
		return null;
	}
	const classes = classNames('ee-biggie-calendar-date-bg', htmlClass, {
		'ee-bcd-pos-left': position === CalendarPosition.LEFT,
		'ee-bcd-pos-right': position !== CalendarPosition.LEFT,
	});

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
		<div className={classes}>
			{headerText && <div className='ee-biggie-calendar-date-header'>{headerText}</div>}
			<div className='ee-biggie-calendar-date'>
				<div className='ee-bcd-weekday'>{format(dateObject, 'eeee')}</div>
				<div className='ee-bcd-month'>{format(dateObject, 'MMMM')}</div>
				<div className='ee-bcd-month-day-sep'></div>
				<div className='ee-bcd-day'>{format(dateObject, 'ee')}</div>
				<div className='ee-bcd-year'>{format(dateObject, 'yyyy')}</div>
				{showTime && <div className='ee-bcd-time'>{format(dateObject, 'h:mm a')}</div>}
			</div>
			{footerText && <div className='ee-biggie-calendar-date-footer'>{footerText}</div>}
			{editDateButton}
		</div>
	);
};
