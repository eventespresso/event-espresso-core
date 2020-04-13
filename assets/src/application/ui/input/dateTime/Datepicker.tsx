import React from 'react';
import { Datepicker as BaseUIDatepicker } from 'baseui/datepicker';

import { DatepickerProps } from './types';
import withBaseProvider from './withBaseProvider';

const Datepicker: React.FC<DatepickerProps> = ({ value, onChangeValue, ...rest }) => {
	const onChange: DatepickerProps['onChange'] = ({ date }) => {
		if (typeof onChangeValue === 'function') {
			onChangeValue(date as Date);
		}
	};

	// TODO: Add locale from useConfig()
	return <BaseUIDatepicker value={[value]} onChange={onChange} {...rest} />;
};

export default withBaseProvider(Datepicker);
