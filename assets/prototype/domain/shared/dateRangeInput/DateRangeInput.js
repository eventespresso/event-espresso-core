import { useState } from 'react';
import isFunction from 'lodash/isFunction';
import { DateRangeInput as DefaultDateRangeInput } from '@blueprintjs/datetime';
import { FORMATS } from './formatSelect';
import { MomentDateRange } from './momentDate';

import './style.css';

const DateRangeInput = ({ endDate, onFieldUpdate, startDate }) => {
	const format = FORMATS.MYSQL;
	const defaultRangeValues = [startDate || null, endDate || null];
	const [range, setRange] = useState(defaultRangeValues);

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

	const defaultState = {
		allowSingleDayRange: false,
		closeOnSelection: false,
		contiguousCalendarMonths: true,
		disabled: false,
		enableTimePicker: false,
		range: [null, null],
		reverseMonthAndYearMenus: false,
		selectAllOnFocus: false,
		shortcuts: true,
		singleMonthOnly: false,
	};

	return (
		<div className='ee-date-range-input'>
			<DefaultDateRangeInput {...defaultState} {...format} onChange={handleRangeChange} />
			<MomentDateRange range={range} withTime />
		</div>
	);
};

export default DateRangeInput;
