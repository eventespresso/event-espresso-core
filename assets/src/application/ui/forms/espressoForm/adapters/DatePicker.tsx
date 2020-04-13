import React from 'react';

import { Datepicker } from '@appInputs/dateTime';
import { FieldRendererProps } from '../types';

const DatePicker: React.FC<FieldRendererProps> = ({ input: { onChange, ...input }, meta, ...rest }) => {
	return <Datepicker {...input} {...rest} onChangeValue={onChange} />;
};

export default DatePicker;
