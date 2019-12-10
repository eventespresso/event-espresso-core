import isFunction from 'lodash/isFunction';
import { DateRangePicker as DefaultDateRangePicker } from '@blueprintjs/datetime';
import { A_LONG_TIME_AGO, PLUS_TEN_YEARS } from '../defaultDates';
import { FORMATS } from './formatSelect';

import './style.css';

const DateRangePicker = ({ onFieldUpdate, range, setRange }) => {
	const format = FORMATS.MYSQL;

	const handleRangeChange = (value) => {
		const [start, end] = value;
		const isUpdatable = isFunction(onFieldUpdate) && start && end;

		if (isUpdatable) {
			const formattedDates = {
				startDate: format.formatDate(start),
				endDate: format.formatDate(end),
			};

			onFieldUpdate(formattedDates);
		}

		setRange(value);
	};

	const appliedProps = {
		allowSingleDayRange: true,
		contiguousCalendarMonths: false,
		value: range,
		maxDateIndex: 0,
		minDateIndex: 0,
		reverseMonthAndYearMenus: false,
		shortcuts: false,
		singleMonthOnly: false,
		timePrecision: true,
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
