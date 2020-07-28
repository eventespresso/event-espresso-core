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

export interface DateTimeRangePickerProps
	extends ReactDateTimeRangePickerProps,
		CommonInputProps<HTMLInputElement, string[]> {
	className?: string;
	endDate: string;
	onChange: (dates: string[]) => void;
	startDate: string;
}

export interface TimePickerProps extends ReactTimePickerProps, CommonInputProps<HTMLInputElement, Date> {
	className?: string;
	onChange?: (time: string) => void;
	value?: Date;
}

type allViews = 'hour' | 'minute' | 'second';
type isProp = (props: AnyObject, propName: string, componentName: string) => null;

interface ReactDateTimeRangePickerProps {
	amPmAriaLabel?: string;
	autoFocus?: boolean;
	calendarAriaLabel?: string;
	calendarClassName?: string | string[];
	calendarIcon?: JSX.Element | null;
	clearAriaLabel?: string;
	clearIcon?: JSX.Element | null;
	clockAriaLabel?: string;
	clockClassName?: string | string[];
	clockIcon?: JSX.Element | null;
	closeClock?: boolean;
	closeWidgets?: boolean;
	dayAriaLabel?: string;
	dayPlaceholder?: string;
	disableCalendar?: boolean;
	disableClock?: boolean;
	disabled?: boolean;
	format?: string;
	hourAriaLabel?: string;
	hourPlaceholder?: string;
	isCalendarOpen?: boolean;
	isClockOpen?: boolean;
	locale?: string;
	maxDate?: isProp;
	maxDetail?: allViews;
	minDate?: isProp;
	minuteAriaLabel?: string;
	minutePlaceholder?: string;
	monthAriaLabel?: string;
	monthPlaceholder?: string;
	name?: string;
	nativeInputAriaLabel?: string;
	onCalendarClose?: VoidFunction;
	onCalendarOpen?: VoidFunction;
	onClockClose?: VoidFunction;
	onClockOpen?: VoidFunction;
	onFocus?: VoidFunction;
	rangeDivider?: JSX.Element | null;
	required?: boolean;
	secondAriaLabel?: string;
	secondPlaceholder?: string;
	showLeadingZeros?: boolean;
	yearAriaLabel?: string;
	yearPlaceholder?: string;
}

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
	maxTime?: isProp;
	minTime?: isProp;
	minuteAriaLabel?: string;
	minutePlaceholder?: string;
	name?: string;
	nativeInputAriaLabel?: string;
	onClockClose?: VoidFunction;
	onClockOpen?: VoidFunction;
	onFocus?: VoidFunction;
	required?: boolean;
	secondAriaLabel?: string;
	secondPlaceholder?: string;
}
