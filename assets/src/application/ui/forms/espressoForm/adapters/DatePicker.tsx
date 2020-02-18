import React from 'react';
import { parse } from 'date-fns';
import { DatePicker as CustomDatePicker } from '../components';
import { dateFormat } from '../constants';

const DatePicker = ({ input, ...rest }) => {
	return (
		<CustomDatePicker
			{...input}
			{...rest}
			value={input.value ? parse(input.value, dateFormat, new Date()) : input.value}
			onChange={(_, dateString) => input.onChange(dateString)}
		/>
	);
};

export default DatePicker;
