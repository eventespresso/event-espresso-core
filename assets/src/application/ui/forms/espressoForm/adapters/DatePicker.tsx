import React from 'react';

import { DatePicker as DatePickerComponent } from '../../../input';
import { FieldRendererProps } from '../types';

// meta does not need to goto the input
// format from RFF is different (function) than needed by DatePicker (string)
const DatePicker: React.FC<FieldRendererProps> = ({ input: { onChange, ...input }, meta, format, ...rest }) => {
	return <DatePickerComponent {...input} {...rest} onChangeValue={onChange} />;
};

export default DatePicker;
