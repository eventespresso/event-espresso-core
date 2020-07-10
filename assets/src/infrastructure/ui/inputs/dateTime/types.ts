import { DatePickerProps as ReactDatePickerProps } from 'react-date-picker';
import { AnyObject } from '@appServices/utilities/types';
import { CommonInputProps } from '../types';

export interface DatePickerProps
	extends Omit<ReactDatePickerProps, 'onChange' | 'value'>,
		CommonInputProps<HTMLInputElement, Date> {
	className?: string;
	onChange?: (date: Date) => void;
	value?: Date;
}

export interface TimePickerProps extends ReactTimePickerProps, CommonInputProps<HTMLInputElement, Date> {
	className?: string;
	value?: Date;
}

type allViews = 'hour' | 'minute' | 'second';
type isTime = (props: AnyObject, propName: string, componentName: string) => null;


interface ReactTimePickerProps {
	amPmAriaLabel?: string;
	autoFocus?: boolean;
	clearAriaLabel?: string;
	clearIcon?: JSX.Element | null;
	clockAriaLabel?: string;
	clockClassName?: string | string[];
	clockIcon?: JSX.Element | null;
	closeClock?: boolean;
	disableClock?: boolean;
	disabled?: boolean;
	format?: string;
	hourAriaLabel?: string;
	hourPlaceholder?: string;
	isOpen?: boolean;
	locale?: string;
	maxDetail?: allViews;
	maxTime?: isTime;
	minTime?: isTime;
	minuteAriaLabel?: string;
	minutePlaceholder?: string;
	name?: string;
	nativeInputAriaLabel?: string;
	onChange?: (time: string) => void;
	onClockClose?: VoidFunction;
	onClockOpen?: VoidFunction;
	onFocus?: VoidFunction;
	required?: boolean;
	secondAriaLabel?: string;
	secondPlaceholder?: string;
}
