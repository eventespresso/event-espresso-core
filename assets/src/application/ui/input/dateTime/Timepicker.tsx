import React from 'react';
import { TimePicker as BaseUITimePicker } from 'baseui/timepicker';

import { TimepickerProps } from './types';
import withBaseProvider from './withBaseProvider';

const Timepicker: React.FC<TimepickerProps> = (props) => {
	return <BaseUITimePicker {...props} />;
};

export default withBaseProvider(Timepicker);
