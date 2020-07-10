import React from 'react';

import { Datepicker } from '@infraUI/inputs/dateTime';
import { FieldRendererProps } from '../types';

// meta does not need to goto the input
// format from RFF is different (function) than needed by DatePicker (string)
const DatePicker: React.FC<FieldRendererProps> = ({ input: { onChange, ...input }, meta, format, ...rest }) => {
	return <Datepicker {...input} {...rest} onChangeValue={onChange} />;
};

export default DatePicker;
