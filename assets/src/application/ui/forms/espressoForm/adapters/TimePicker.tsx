import React from 'react';

import { Timepicker } from '@infraUI/inputs/dateTime';
import { FieldRendererProps } from '../types';

const TimePicker: React.FC<FieldRendererProps> = ({ input, meta, ...rest }) => {
	return (
		<Timepicker
			{...input}
			{...rest}
			format='12'
			// 300 seconds(5 minutes)
			step={300}
		/>
	);
};

export default TimePicker;
