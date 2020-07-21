import React from 'react';

import { TimePicker as TimePickerComponent } from '../../../input';
import { FieldRendererProps } from '../types';

// meta does not need to goto the input
// format from RFF is different (function) than needed by DatePicker (string)
const TimePicker: React.FC<FieldRendererProps> = ({ input: { onChange, ...input }, meta, format, ...rest }) => {
	return <TimePickerComponent {...input} {...rest} onChangeValue={onChange} />;
};

export default TimePicker;
