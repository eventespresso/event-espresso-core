import React from 'react';
import { parse } from 'date-fns';
import DatePickerBase from './DatePickerBase';
import { defaultDateFormat } from '../../../constants/momentFormats';

const DatePicker = ({ input, ...rest }) => {
	return (
		<DatePickerBase
			{...input}
			{...rest}
			value={input.value ? parse(input.value, defaultDateFormat, new Date()) : input.value}
			onChange={(_, dateString) => input.onChange(dateString)}
		/>
	);
};

export default DatePicker;
