import { format, parseISO, isValid } from 'date-fns';
import React, { useCallback } from 'react';

import { EspressoButton } from '@application/ui/input/EspressoButton';
import TimezoneTimeInfo from '../TimezoneTimeInfo';
import {
	DAY_ONLY_SHORT_FORMAT,
	MONTH_ONLY_FULL_FORMAT,
	TIME_ONLY_12H_SHORT_FORMAT,
	WEEKDAY_ONLY_FULL_FORMAT,
	YEAR_ONLY_LONG_FORMAT,
} from '@appConstants/dateFnsFormats';
import { CalendarDateProps } from '../types';
import './style.scss';

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
	className += ' ee-biggie-calendar-date__wrapper';

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
			{headerText && <div className='ee-biggie-calendar-date__header'>{headerText}</div>}
			<div className='ee-biggie-calendar-date'>
				<div className='ee-bcd__weekday'>{format(dateObject, WEEKDAY_ONLY_FULL_FORMAT)}</div>
				<div className='ee-bcd__month'>{format(dateObject, MONTH_ONLY_FULL_FORMAT)}</div>
				<div className='ee-bcd__month-day-sep'></div>
				<div className='ee-bcd__day'>{format(dateObject, DAY_ONLY_SHORT_FORMAT)}</div>
				<div className='ee-bcd__year'>{format(dateObject, YEAR_ONLY_LONG_FORMAT)}</div>
				<TimezoneTimeInfo date={dateObject} />
				{showTime && <div className='ee-bcd__time'>{format(dateObject, TIME_ONLY_12H_SHORT_FORMAT)}</div>}
			</div>
			{footerText && <div className='ee-biggie-calendar-date__footer'>{footerText}</div>}
			{editDateButton}
		</div>
	);
};
