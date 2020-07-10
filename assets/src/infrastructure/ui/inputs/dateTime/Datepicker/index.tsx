import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { default as ReactDatepicker } from 'react-date-picker';

import { DatePickerProps } from '../types';
import { CalendarOutlined, CloseOutlined } from '@appDisplay/icons/svgs';
import useConfig from '@appServices/config/useConfig';
import { convertWordPressDateFormat } from '../utilities';

import './style.scss';

const Datepicker: React.FC<DatePickerProps> = ({ value, onChange, onChangeValue, ...props }) => {
	const [date, setDate] = useState(value);
	const {
		dateTimeFormats: { dateFormat },
		locale: { user },
	} = useConfig();
	const convertedDateFormat = convertWordPressDateFormat(dateFormat);
	const className = classNames(
		'ee-input-base-wrapper ee-date-picker',
		props.className
	);
	const onChangeHandler: DatePickerProps['onChange'] = useCallback(
		(newDate) => {
			setDate(newDate);
			if (!newDate || newDate === date) {
				return;
			}

			if (typeof onChangeValue === 'function') {
				onChangeValue(newDate as Date);
			}

			if ( typeof onChange === 'function' ) {
				onChange(newDate);
			}
		},
		[ onChange, onChangeValue, ]
	);

	return (
		<div className={className}>
			<ReactDatepicker
				format={convertedDateFormat}
				{...props}
				calendarIcon={<CalendarOutlined />}
				clearIcon={<CloseOutlined />}
				locale={user}
				onChange={onChangeHandler}
				required
				value={date}
			/>
		</div>
	);
};

export default Datepicker;
