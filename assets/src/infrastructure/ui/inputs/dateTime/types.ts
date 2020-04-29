import type { DatepickerProps as BaseUIDatepickerProps } from 'baseui/datepicker';
import type { TimePickerProps as BaseUITimePickerProps } from 'baseui/timepicker';

import { CommonInputProps } from '../types';

export interface DatepickerProps extends BaseUIDatepickerProps, CommonInputProps<HTMLInputElement, Date> {
	className?: string;
	value?: Date;
}

export interface TimepickerProps extends BaseUITimePickerProps, CommonInputProps<HTMLInputElement, Date> {
	className?: string;
	value?: Date;
}
