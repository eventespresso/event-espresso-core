import React from 'react';
import { parse } from 'date-fns';
import TimePickerBase from './TimePickerBase';
import { defaultTimeFormat } from '../../../constants/momentFormats';

const TimePicker = ({ input, ...rest }) => {
	return (
		<TimePickerBase
			{...input}
			{...rest}
			value={input.value ? parse(input.value, defaultTimeFormat, new Date()) : input.value}
			onChange={(_, dateString) => input.onChange(dateString)}
		/>
	);
};

export default TimePicker;
