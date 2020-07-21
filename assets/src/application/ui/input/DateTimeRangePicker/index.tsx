import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { DateTimeRangePicker as DateTimeRangePickerAdapter, DateTimeRangePickerProps } from '@infraUI/inputs';
import { IconButton, ButtonType } from '../Button';
import { Save } from '../../display/icons';

const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = ({
	className,
	startDate,
	endDate,
	onChange,
	onChangeValue,
	...props
}) => {
	const [dates, setDates] = useState([startDate, endDate]);

	const onSave: VoidFunction = useCallback(() => {
		if (typeof onChangeValue === 'function') {
			onChangeValue(dates);
		}

		if (typeof onChange === 'function') {
			onChange(dates);
		}
	}, [dates, onChange, onChangeValue]);

	const htmlClass = classNames(
		className,
		'ee-date-time-range-picker',
		'ee-calendar-datetime-picker',
		'ee-input-base-wrapper'
	);

	const [start, end] = dates;

	return (
		<div className={htmlClass}>
			<DateTimeRangePickerAdapter required onChange={setDates} startDate={start} endDate={end} {...props} />
			<IconButton
				aria-label={__('save')}
				buttonType={ButtonType.MINIMAL}
				className={'ee-date-time-range-picker-submit'}
				icon={Save}
				onClick={onSave}
			/>
		</div>
	);
};

export default DateTimeRangePicker;
