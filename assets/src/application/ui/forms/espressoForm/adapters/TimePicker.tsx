import React from 'react';
import { parse } from 'date-fns';
import { TimePicker as CustomTimePicker } from '../components';
import { timeFormat } from '../constants';

const TimePicker = ({ input, ...rest }) => {
	return (
		<CustomTimePicker
			{...input}
			{...rest}
			value={input.value ? parse(input.value, timeFormat, new Date()) : input.value}
			onChange={(_, dateString) => input.onChange(dateString)}
		/>
	);
};

export default TimePicker;
