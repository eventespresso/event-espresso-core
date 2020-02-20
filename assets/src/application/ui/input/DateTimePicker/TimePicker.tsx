import React from 'react';
import { parse } from 'date-fns';
import TimePickerBase from './TimePickerBase';
import { CONVERT_TO_MOMENT_DATE_FORMAT } from '../../../constants';

const TimePicker = ({ input, ...rest }) => {
	return (
		<TimePickerBase
			{...input}
			{...rest}
			value={input.value ? parse(input.value, CONVERT_TO_MOMENT_DATE_FORMAT, new Date()) : input.value}
			onChange={(_, dateString) => input.onChange(dateString)}
		/>
	);
};

export default TimePicker;
