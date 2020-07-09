import React from 'react';

import { Timepicker } from '@infraUI/inputs/dateTime';
import { FieldRendererProps } from '../types';

const TimePicker: React.FC<FieldRendererProps> = ({ input: { onChange, ...input }, meta, ...rest }) => {
	return (
		<Timepicker
			{...input}
			{...rest}
			onChangeValue={onChange}
		/>
	);
};

export default TimePicker;
