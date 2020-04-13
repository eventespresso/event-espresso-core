import React, { useCallback } from 'react';
import { Datepicker as BaseUIDatepicker } from 'baseui/datepicker';

import { DatepickerProps } from './types';
import withBaseProvider from './withBaseProvider';

const Datepicker: React.FC<DatepickerProps> = ({ value, onChange, onChangeValue, ...props }) => {
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

	return <BaseUIDatepicker {...props} value={[value]} onChange={onChangeHandler} />;
};

export default withBaseProvider(Datepicker);
