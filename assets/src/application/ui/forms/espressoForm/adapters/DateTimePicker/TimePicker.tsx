import React from 'react';
import { parse } from 'date-fns';
import TimePickerBase from './TimePickerBase';
import { CONVERT_TO_MOMENT_TIME_FORMAT } from '@appConstants/dateFnsFormats';

const TimePicker = ({ input, meta, ...rest }) => {
	return (
		<TimePickerBase
			{...input}
			{...rest}
			inputReadOnly
			value={input.value ? parse(input.value, CONVERT_TO_MOMENT_TIME_FORMAT, new Date()) : input.value}
			onChange={(_, dateString) => input.onChange(dateString)}
		/>
	);
};

export default TimePicker;
