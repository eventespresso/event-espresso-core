import React from 'react';
import { parseISO, isValid } from 'date-fns';
import { Tooltip } from 'antd';
import { __ } from '@wordpress/i18n';

import { useTimeZoneTime } from '@appServices/hooks';

import './style.scss';
import {
	DAY_ONLY_SHORT_FORMAT,
	MONTH_ONLY_LONG_FORMAT,
	LOCALIZED_DATE_AND_TIME_FULL_FORMAT,
} from '@appConstants/dateFnsFormats';

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
	statusClassName?: string;
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
	statusClassName,
	...otherProps
}) => {
	const { formatForSite: format } = useTimeZoneTime();

	const startDateObject = startDate instanceof Date ? startDate : parseISO(startDate);
	const endDateObject = endDate instanceof Date ? endDate : parseISO(endDate);
	if (!isValid(startDateObject) && !isValid(endDateObject)) {
		return null;
	}

	const getStartDate = (startDate: Date, statusClassName: string) => {
		return (
			startDate && (
				<div className='ee-calendar-page-date-wrapper-start'>
					{renderCalendarPage(startDate, statusClassName)}
				</div>
			)
		);
	};

	const getEndDate = (endDate: Date, statusClassName: string) => {
		return (
			endDate && (
				<div className='ee-calendar-page-date-wrapper-end'>
					{renderCalendarPage(endDate, statusClassName, 'end')}
				</div>
			)
		);
	};

	const getDivider = (startDate: Date, endDate: Date) => {
		return startDate && endDate && <div className='ee-calendar-page-date-to'>{__('TO')}</div>;
	};

	const renderCalendarPage = (date: Date, statusClassName: string, startOrEnd = 'start') => {
		let className = `ee-calendar-page-date-page ee-calendar-page-date-${startOrEnd}`;
		className += statusClassName ? ` ${statusClassName}` : '';
		return (
			<Tooltip title={format(date, LOCALIZED_DATE_AND_TIME_FULL_FORMAT)}>
				<div className={className}>
					<div className={'ee-calendar-page-date-month'}>{format(date, MONTH_ONLY_LONG_FORMAT)}</div>
					<div className={'ee-calendar-page-date-day'}>{format(date, DAY_ONLY_SHORT_FORMAT)}</div>
				</div>
			</Tooltip>
		);
	};

	const className = `ee-calendar-page-date-wrapper ee-calendar-page-date-${size}`;
	return (
		<div className={className} {...otherProps}>
			{getStartDate(startDateObject, statusClassName)}
			{getDivider(startDateObject, endDateObject)}
			{getEndDate(endDateObject, statusClassName)}
		</div>
	);
};
