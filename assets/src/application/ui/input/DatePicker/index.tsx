import React from 'react';
import classNames from 'classnames';
import { DatePicker as DatepickerAdapter, DatePickerProps } from '@infraUI/inputs';

const DatePicker: React.FC<DatePickerProps> = ({ className, ...props }) => {
	const htmlClass = classNames(className, 'ee-date-picker', 'ee-calendar-datetime-picker', 'ee-input-base-wrapper');
	return (
		<div className={htmlClass}>
			<DatepickerAdapter required {...props} />
		</div>
	);
};

export default DatePicker;
