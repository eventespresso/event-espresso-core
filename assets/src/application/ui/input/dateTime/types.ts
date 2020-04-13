import type { DatepickerProps as BaseUIDatepickerProps } from 'baseui/datepicker';
import type { TimePickerProps as BaseUITimePickerProps } from 'baseui/timepicker';

export interface DatepickerProps extends BaseUIDatepickerProps {
	value?: Date;
	onChangeValue?: (date: Date) => void;
}

export interface TimepickerProps extends BaseUITimePickerProps {}
