import { useState } from 'react';
import isFunction from 'lodash/isFunction';
import moment from 'moment';
import { DateRangeInput as DefaultDateRangeInput } from '@blueprintjs/datetime';
import { FORMATS } from './formatSelect';
import { MomentDateRange } from './momentDate';

import './style.css';

const DateRangeInput = ({ endDate, onFieldUpdate, startDate }) => {
	const format = FORMATS[0];
	const defaultRangeValues = [startDate || null, endDate || null];
	const [range, setRange] = useState(defaultRangeValues);

	const handleRangeChange = (value) => {
		const [start, end] = value;
		const isUpdatable = isFunction(onFieldUpdate) && start && end;

		if (isUpdatable) {
			const format = 'YYYY-MM-DD HH:mm:ss';
			const formattedDates = {
				startDate: moment(start).format(format),
				endDate: moment(end).format(format),
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
