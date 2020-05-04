import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Datepicker as BaseUIDatepicker } from 'baseui/datepicker';

import { DatepickerProps } from '../types';
import withBaseProvider from '../withBaseProvider';

import './style.scss';

const Datepicker: React.FC<DatepickerProps> = ({ value, onChange, onChangeValue, ...props }) => {
	const className = classNames('ee-input-base-wrapper ee-date-picker', props.className);
	const onChangeHandler: DatepickerProps['onChange'] = useCallback(
		({ date }) => {
			if (typeof onChangeValue === 'function') {
				onChangeValue(date as Date);
			}

			if (typeof onChange === 'function') {
				onChange({ date });
			}
		},
		[onChange, onChangeValue]
	);

	return (
		<div className={className}>
			<BaseUIDatepicker {...props} onChange={onChangeHandler} value={[value]} />
		</div>
	);
};

export default withBaseProvider(Datepicker);
