import React, { useCallback } from 'react';
import classNames from 'classnames';
// @ts-ignore
import { default as ReactTimePicker } from 'react-time-picker';

import { CloseOutlined, ClockOutlined } from '@appDisplay/icons/svgs';
import { TimePickerProps } from '../types';

import './style.scss';

const Timepicker: React.FC<TimePickerProps> = ({ onChange, onChangeValue, ...props }) => {
	const newDate = props?.value;
	const className = classNames('ee-input-base-wrapper ee-time-picker', props.className);
	const onChangeHandler: TimePickerProps['onChange'] = useCallback(
		(time) => {
			// incoming value from timepicker is 24hr time like "17:00"
			const timeParts: string[] = time.split(':');
			const hours = parseInt(timeParts[0]);
			const minutes = parseInt(timeParts[1]);
			newDate.setHours(hours);
			newDate.setMinutes(minutes);
			if (typeof onChangeValue === 'function') {
				onChangeValue(newDate);
			}

			if (typeof onChange === 'function') {
				onChange(newDate.toISOString());
			}
		},
		[onChange, onChangeValue]
	);

	return (
		<div className={className}>
			<ReactTimePicker
				format={'hh:mm a'}
				{...props}
				clearIcon={<CloseOutlined />}
				clockIcon={null}
				onChange={onChangeHandler}
			/>
		</div>
	);
};

export default Timepicker;
