/**
 * External imports
 */
import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { Tooltip } from 'antd';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.css';

export enum CalendarPageSize {
	TINY = 'tiny',
	SMALL = 'small',
	MEDIUM = 'medium',
	BIG = 'big',
}

export interface CalendarPageDateProps {
	startDate?: Date;
	endDate?: Date;
	size?: CalendarPageSize;
	statusClass?: string;
}

/**
 * CalendarPageDate
 * Displays a date as if it were a page from
 * one of those mini calendars where each page is a day
 */
export const CalendarPageDate: React.FC<CalendarPageDateProps> = ({
	startDate,
	endDate,
	size = CalendarPageSize.SMALL,
	statusClass,
	...otherProps
}) => {
	const startDateObject = startDate instanceof Date ? startDate : parseISO(startDate);
	const endDateObject = endDate instanceof Date ? endDate : parseISO(endDate);
	if (!isValid(startDateObject) && !isValid(endDateObject)) {
		return null;
	}

	const getStartDate = (startDate: Date, statusClass: string) => {
		return (
			startDate && (
				<div className='ee-calendar-page-date-wrapper-start'>{renderCalendarPage(startDate, statusClass)}</div>
			)
		);
	};

	const getEndDate = (endDate: Date, statusClass: string) => {
		return (
			endDate && (
				<div className='ee-calendar-page-date-wrapper-end'>
					{renderCalendarPage(endDate, statusClass, 'end')}
				</div>
			)
		);
	};

	const getDivider = (startDate: Date, endDate: Date) => {
		return startDate && endDate && <div className='ee-calendar-page-date-to'>{__('TO', 'event_espresso')}</div>;
	};

	const renderCalendarPage = (date: Date, statusClass: string, startOrEnd = 'start') => {
		let className = `ee-calendar-page-date-page ee-calendar-page-date-${startOrEnd}`;
		className += statusClass ? ` ${statusClass}` : '';
		return (
			<Tooltip title={format(date, 'PPPPpppp')}>
				<div className={className}>
					<div className={'ee-calendar-page-date-month'}>{format(date, 'MMM')}</div>
					<div className={'ee-calendar-page-date-day'}>{format(date, 'ee')}</div>
				</div>
			</Tooltip>
		);
	};

	const className = `ee-calendar-page-date-wrapper ee-calendar-page-date-${size}`;
	return (
		<div className={className} {...otherProps}>
			{getStartDate(startDateObject, statusClass)}
			{getDivider(startDateObject, endDateObject)}
			{getEndDate(endDateObject, statusClass)}
		</div>
	);
};
