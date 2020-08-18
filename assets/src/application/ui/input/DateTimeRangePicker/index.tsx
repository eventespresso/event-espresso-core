import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { DateTimeRangePicker as DateTimeRangePickerAdapter, DateTimeRangePickerProps } from '@infraUI/inputs';
import { IconButton, ButtonType } from '../Button';
import { Save } from '../../display/icons';

const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = ({
	className,
	onChange,
	onChangeValue,
	value,
	...props
}) => {
	const [dates, setDates] = useState(value);

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

	return (
		<div className={htmlClass}>
			<DateTimeRangePickerAdapter
				required
				onChange={setDates}
				value={dates}
				{...props}
			/>
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
