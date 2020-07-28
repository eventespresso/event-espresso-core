import React from 'react';
// @ts-ignore
import { default as ReactDateTimeRangePicker } from '@wojtekmaj/react-datetimerange-picker';
import { __ } from '@wordpress/i18n';

import { DateTimeRangePickerProps } from '../types';
import useConfig from '@appServices/config/useConfig';
import { convertWordPressDateFormat, convertWordPressTimeFormat } from '../utilities';

import '../style.scss';
import './style.scss';

const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = ({ endDate, onChange, startDate, ...props }) => {
	const {
		dateTimeFormats: { dateTimeFormat },
		locale: { user },
	} = useConfig();

	// convert date format to acceptable values for react-datetimerange-picker
	const newDateFormat = convertWordPressDateFormat(dateTimeFormat);
	const newDateTimeFormat = convertWordPressTimeFormat(newDateFormat);

	return (
		<ReactDateTimeRangePicker
			calendarAriaLabel={__('show calendar')}
			clearAriaLabel={__('clear values and reset')}
			closeWidgets={false}
			disableClock
			format={newDateTimeFormat}
			locale={user}
			onChange={onChange}
			showLeadingZeros
			value={[new Date(startDate), new Date(endDate)]}
			{...props}
		/>
	);
};

export default DateTimeRangePicker;
