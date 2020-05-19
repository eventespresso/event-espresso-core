import React, { useCallback } from 'react';
import classNames from 'classnames';
import { TimePicker as BaseUITimePicker } from 'baseui/timepicker';

import { TimepickerProps } from '../types';
import withBaseProvider from '../withBaseProvider';

import './style.scss';

const Timepicker: React.FC<TimepickerProps> = ({ onChange, onChangeValue, ...props }) => {
	const className = classNames('ee-input-base-wrapper ee-time-picker', props.className);
	const onChangeHandler: TimepickerProps['onChange'] = useCallback(
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
			<BaseUITimePicker {...props} onChange={onChangeHandler} />
		</div>
	);
};

export default withBaseProvider(Timepicker);
