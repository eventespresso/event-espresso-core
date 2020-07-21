import React from 'react';
import classNames from 'classnames';
import { TimePicker as TimePickerAdapter, TimePickerProps } from '@infraUI/inputs';
import { TimezoneTimeInfo } from '../../display';

import './style.scss';

const TimePicker: React.FC<TimePickerProps> = ({ onChange, onChangeValue, value, ...props }) => {
	const className = classNames(
		props.className,
		'ee-time-picker',
		'ee-calendar-datetime-picker',
		'ee-input-base-wrapper'
	);
	return (
		<div className={className}>
			<TimePickerAdapter required {...props} value={value} />
			<TimezoneTimeInfo date={value} />
		</div>
	);
};

export default TimePicker;
