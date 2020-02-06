// @ts-nocheck
import React from 'react';
import { DateRangePicker as DefaultDateRangePicker, IDateRangePickerProps } from '@blueprintjs/datetime';
import { A_LONG_TIME_AGO, PLUS_TEN_YEARS } from '../../constants/defaultDates';
import { FORMATS } from './formatSelect';

import './style.css';

type FormattedDates = {
	startDate: string;
	endDate: string;
};

interface DateRangePickerProps {
	onFieldUpdate: (formattedDates: FormattedDates) => void;
	range: [Date, Date];
	setRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onFieldUpdate, range, setRange }): JSX.Element => {
	const format = FORMATS.MYSQL;

	const handleRangeChange = (value: [Date, Date]): void => {
		const [start, end] = value;
		const isUpdatable = start && end;

		if (isUpdatable) {
			const formattedDates: FormattedDates = {
				startDate: format.formatDate(start),
				endDate: format.formatDate(end),
			};

			onFieldUpdate(formattedDates);
		}

		setRange(value);
	};

	const appliedProps: IDateRangePickerProps = {
		allowSingleDayRange: true,
		contiguousCalendarMonths: false,
		value: range,
		reverseMonthAndYearMenus: false,
		shortcuts: false,
		singleMonthOnly: false,
		timePrecision: 'minute' as 'minute',
	};

	return (
		<div className='ee-date-range-picker'>
			<DefaultDateRangePicker
				{...appliedProps}
				maxDate={PLUS_TEN_YEARS}
				minDate={A_LONG_TIME_AGO}
				onChange={handleRangeChange}
			/>
		</div>
	);
};

export default DateRangePicker;
