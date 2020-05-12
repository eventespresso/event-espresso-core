import React, { useCallback } from 'react';
import classNames from 'classnames';
import { parseISO, isValid } from 'date-fns';

import { CalendarDateProps } from '../types';
import { Button } from '@application/ui/input/Button';
import { TimezoneTimeInfo } from '@application/ui/display';
import { LabelPosition } from '@appDisplay/withLabel';
import {
	DAY_ONLY_SHORT_FORMAT,
	MONTH_ONLY_FULL_FORMAT,
	TIME_ONLY_12H_SHORT_FORMAT,
	WEEKDAY_ONLY_FULL_FORMAT,
	YEAR_ONLY_LONG_FORMAT,
} from '@appConstants/dateFnsFormats';
import { useTimeZoneTime } from '@appServices/hooks';
import './style.scss';
import { Calendar } from '@appDisplay/icons';

export interface BiggieCalendarDateProps extends CalendarDateProps {
	date: Date | string;
}

/**
 * Displays a full calendar date, but REALLY BIG!!
 */
export const BiggieCalendarDate: React.FC<BiggieCalendarDateProps> = ({
	date,
	editButton = {},
	footerText,
	headerText,
	onEdit = null,
	showTime = false,
	...props
}) => {
	const { formatForSite: format } = useTimeZoneTime();
	const onEditHandler = useCallback((event) => onEdit(event), [onEdit]);
	const dateObject = date instanceof Date ? date : parseISO(date);

	if (!isValid(dateObject)) {
		return null;
	}

	const className = classNames(props.className, 'ee-biggie-calendar-date__wrapper');

	const editDateButton = typeof onEdit === 'function' && (
		<Button
			className='ee-edit-calendar-date-btn'
			onClick={onEditHandler}
			onKeyPress={onEditHandler}
			tooltip={editButton.tooltip}
			labelPosition={editButton.tooltipPosition as LabelPosition}
			icon={Calendar}
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
				{showTime && <div className='ee-bcd__time'>{format(dateObject, TIME_ONLY_12H_SHORT_FORMAT)}</div>}
				<TimezoneTimeInfo date={dateObject} />
			</div>
			{footerText && <div className='ee-biggie-calendar-date__footer'>{footerText}</div>}
			{editDateButton}
		</div>
	);
};
