import React, { useCallback } from 'react';
import { parse } from 'date-fns';
import { default as ReactTimePicker } from 'react-time-picker';

import { CloseOutlined } from '@appDisplay/icons/svgs';
import { TimePickerProps } from '../types';
import useConfig from '@appServices/config/useConfig';
import { convertWordPressTimeFormat } from '../utilities';

import '../style.scss';

const TimePicker: React.FC<TimePickerProps> = ({ onChange, onChangeValue, value, ...props }) => {
	const {
		dateTimeFormats: { timeFormat },
		locale: { user },
	} = useConfig();

	// convert date format to accepatble values for react-time-picker
	const convertedTimeFormat = convertWordPressTimeFormat(timeFormat);

	const onChangeHandler = useCallback(
		(newTime: string): void => {
			// incoming value from timepicker is 24hr time like "17:00"
			if (!newTime) {
				return;
			}
			// lets not assume that TimePicker will be controlled.
			const referenceDate = value instanceof Date ? value : new Date();
			const newDate = parse(newTime, 'HH:mm', referenceDate);
			onChangeValue?.(newDate);
			onChange?.(newDate);
		},
		[onChange, onChangeValue, value]
	);

	return (
		<ReactTimePicker
			format={convertedTimeFormat}
			{...props}
			clearIcon={<CloseOutlined />}
			clockIcon={null}
			locale={user}
			onChange={onChangeHandler}
			required
			value={value}
		/>
	);
};

export default TimePicker;
