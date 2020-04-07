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
	startDate?: string;
	endDate?: string;
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

	if (!isValid(parseISO(startDate)) || !isValid(parseISO(endDate))) {
		return null;
	}

	const getStartDate = (startDate: string, statusClassName: string) => {
		return (
			startDate && (
				<div className='ee-calendar-page-date-wrapper-start'>
					{renderCalendarPage(startDate, statusClassName)}
				</div>
			)
		);
	};

	const getEndDate = (endDate: string, statusClassName: string) => {
		return (
			endDate && (
				<div className='ee-calendar-page-date-wrapper-end'>
					{renderCalendarPage(endDate, statusClassName, 'end')}
				</div>
			)
		);
	};

	const getDivider = (startDate: string, endDate: string) => {
		return startDate && endDate && <div className='ee-calendar-page-date-to'>{__('TO')}</div>;
	};

	const renderCalendarPage = (date: string, statusClassName: string, startOrEnd = 'start') => {
		let className = `ee-calendar-page-date-page ee-calendar-page-date-${startOrEnd}`;
		className += statusClassName ? ` ${statusClassName}` : '';
		const title = format(date, LOCALIZED_DATE_AND_TIME_FULL_FORMAT);

		return (
			<Tooltip title={title}>
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
			{getStartDate(startDate, statusClassName)}
			{getDivider(startDate, endDate)}
			{getEndDate(endDate, statusClassName)}
		</div>
	);
};
