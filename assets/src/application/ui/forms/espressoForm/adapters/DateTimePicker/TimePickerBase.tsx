import React from 'react';
import DatePicker from './DatePickerBase';
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';
import { Omit } from 'antd/es/_util/type';

export interface TimePickerProps extends Omit<PickerTimeProps<Date>, 'picker'> {}

const TimePickerBase = React.forwardRef<any, TimePickerProps>((props, ref) => {
	return <DatePicker {...props} picker='time' mode={undefined} ref={ref} />;
});

TimePickerBase.displayName = 'TimePicker';

export default TimePickerBase;
