import React, { useCallback } from 'react';
import { TimePicker as BaseUITimePicker } from 'baseui/timepicker';

import { TimepickerProps } from './types';
import withBaseProvider from './withBaseProvider';

import './style.scss';

const Timepicker: React.FC<TimepickerProps> = ({ onChange, onChangeValue, ...props }) => {
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

	return <BaseUITimePicker {...props} onChange={onChangeHandler} />;
};

export default withBaseProvider(Timepicker);
