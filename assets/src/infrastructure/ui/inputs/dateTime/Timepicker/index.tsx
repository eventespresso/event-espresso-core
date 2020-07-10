import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { format, parse } from 'date-fns';
import { default as ReactTimePicker } from 'react-time-picker';
import { TimezoneTimeInfo } from '@application/ui/display';

import { CloseOutlined } from '@appDisplay/icons/svgs';
import { TimePickerProps } from '../types';
import useConfig from '@appServices/config/useConfig';
import { convertWordPressTimeFormat } from '../utilities';

import './style.scss';

const Timepicker: React.FC<TimePickerProps> = ({ onChange, onChangeValue, value, ...props }) => {
	const [time, setTime] = useState(format(value, 'HH:mm'));
	const {
		dateTimeFormats: { timeFormat },
		locale: { user },
	} = useConfig();
	const convertedTimeFormat = convertWordPressTimeFormat(timeFormat);
	const className = classNames('ee-input-base-wrapper ee-time-picker', props.className);
	const onChangeHandler: TimePickerProps['onChange'] = useCallback(
		(newTime) => {
			// incoming value from timepicker is 24hr time like "17:00"
			setTime(newTime);
			if (!newTime || newTime === time) {
				return;
			}
			const newDate: Date = parse(newTime, 'HH:mm', value);
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
				format={convertedTimeFormat}
				{...props}
				clearIcon={<CloseOutlined />}
				clockIcon={null}
				locale={user}
				onChange={onChangeHandler}
				required
				value={time}
			/>
			<TimezoneTimeInfo date={value} />
		</div>
	);
};

export default Timepicker;
