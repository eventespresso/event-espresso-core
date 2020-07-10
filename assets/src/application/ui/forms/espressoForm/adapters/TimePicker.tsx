import React from 'react';

import { Timepicker } from '@infraUI/inputs/dateTime';
import { FieldRendererProps } from '../types';

// meta does not need to goto the input
// format from RFF is different (function) than needed by DatePicker (string)
const TimePicker: React.FC<FieldRendererProps> = ({ input: { onChange, ...input }, meta, format, ...rest }) => {
	return <Timepicker {...input} {...rest} onChangeValue={onChange} />;
};

export default TimePicker;
