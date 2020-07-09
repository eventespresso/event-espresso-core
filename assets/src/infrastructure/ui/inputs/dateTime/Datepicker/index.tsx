import React, { useCallback } from 'react';
import classNames from 'classnames';
import { default as ReactDatepicker } from 'react-date-picker';

import { DatePickerProps } from '../types';
import { CalendarOutlined, CloseOutlined } from '@appDisplay/icons/svgs';

import './style.scss';

const Datepicker: React.FC<DatePickerProps> = ({ value, onChange, onChangeValue, ...props }) => {
	const className = classNames('ee-input-base-wrapper ee-date-picker', props.className);
	const onChangeHandler: DatePickerProps['onChange'] = useCallback(
		(date) => {
			if (typeof onChangeValue === 'function') {
				onChangeValue(date as Date);
			}

			if (typeof onChange === 'function') {
				onChange(date);
			}
		},
		[onChange, onChangeValue]
	);

	return (
		<div className={className}>
			<ReactDatepicker
				format={'y-MM-dd'}
				{...props}
				calendarIcon={<CalendarOutlined />}
				clearIcon={<CloseOutlined />}
				onChange={onChangeHandler}
				required
				value={value}
			/>
		</div>
	);
};

export default Datepicker;
