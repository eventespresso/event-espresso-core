import React from 'react';

import { Timepicker } from '@appInputs/dateTime';
import { FieldRendererProps } from '../types';

const TimePicker: React.FC<FieldRendererProps> = ({ input, meta, ...rest }) => {
	return (
		<Timepicker
			{...input}
			{...rest}
			format='12'
			// 600 seconds(10 mins)
			step={600}
		/>
	);
};

export default TimePicker;
