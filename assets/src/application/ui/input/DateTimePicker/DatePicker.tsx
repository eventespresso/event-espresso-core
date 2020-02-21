import React from 'react';
import { parse } from 'date-fns';
import DatePickerBase from './DatePickerBase';
import { CONVERT_TO_MOMENT_DATE_FORMAT } from '../../../constants';

const DatePicker = ({ input, ...rest }) => {
	return (
		<DatePickerBase
			{...input}
			{...rest}
			value={input.value ? parse(input.value, CONVERT_TO_MOMENT_DATE_FORMAT, new Date()) : input.value}
			onChange={(_, dateString) => input.onChange(dateString)}
		/>
	);
};

export default DatePicker;
