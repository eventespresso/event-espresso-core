import React, { useCallback } from 'react';
import { default as ReactDatepicker } from 'react-date-picker';

import { DatePickerProps } from '../types';
import { CalendarOutlined, CloseOutlined } from '@appDisplay/icons/svgs';
import useConfig from '@appServices/config/useConfig';
import { convertWordPressDateFormat } from '../utilities';

import '../style.scss';

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, onChangeValue, ...props }) => {
	const {
		dateTimeFormats: { dateFormat },
		locale: { user },
	} = useConfig();

	const onChangeHandler: DatePickerProps['onChange'] = useCallback(
		(newDate) => {
			if (!newDate) {
				return;
			}
			onChangeValue?.(newDate);
			onChange?.(newDate);
		},
		[onChange, onChangeValue]
	);

	// convert date format to accepatble values for react-date-picker
	const convertedDateFormat = convertWordPressDateFormat(dateFormat);

	return (
		<ReactDatepicker
			format={convertedDateFormat}
			{...props}
			calendarIcon={<CalendarOutlined />}
			clearIcon={<CloseOutlined />}
			locale={user}
			onChange={onChangeHandler}
			value={value}
		/>
	);
};

export default DatePicker;
