import React, { useCallback, useState } from 'react';
import { default as ReactDatepicker } from 'react-date-picker';

import { DatePickerProps } from '../types';
import { CalendarOutlined, CloseOutlined } from '@appDisplay/icons/svgs';
import useConfig from '@appServices/config/useConfig';
import { convertWordPressDateFormat } from '../utilities';

import '../style.scss';

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, onChangeValue, ...props }) => {
	const [date, setDate] = useState(value);
	const {
		dateTimeFormats: { dateFormat },
		locale: { user },
	} = useConfig();

	const onChangeHandler: DatePickerProps['onChange'] = useCallback(
		(newDate) => {
			setDate(newDate);
			if (!newDate || newDate === date) {
				return;
			}

			if (typeof onChangeValue === 'function') {
				onChangeValue(newDate as Date);
			}

			if (typeof onChange === 'function') {
				onChange(newDate);
			}
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
			value={date}
		/>
	);
};

export default DatePicker;
