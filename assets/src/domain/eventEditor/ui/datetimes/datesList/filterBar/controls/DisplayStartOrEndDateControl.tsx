import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@appInputs/SelectInput';
import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';

interface DisplayStartOrEndDateControlProps {
	displayStartOrEndDate: DisplayStartOrEndDate;
	setDisplayStartOrEndDate: (displayStartOrEndDate: DisplayStartOrEndDate) => void;
}
/**
 * filter for controlling which dates display in a list of Event Dates
 */
const DisplayStartOrEndDateControl: React.FC<DisplayStartOrEndDateControlProps> = React.memo(
	({ displayStartOrEndDate, setDisplayStartOrEndDate }) => {
		return (
			<SelectInput
				label={__('display')}
				className='espresso-date-list-filter-bar-display-select'
				value={displayStartOrEndDate}
				options={[
					{
						value: DisplayStartOrEndDate.start,
						label: __('start dates only'),
					},
					{
						value: DisplayStartOrEndDate.end,
						label: __('end dates only'),
					},
					{
						value: DisplayStartOrEndDate.both,
						label: __('start and end dates'),
					},
				]}
				onChange={setDisplayStartOrEndDate}
			/>
		);
	}
);

export default React.memo(DisplayStartOrEndDateControl, getPropsAreEqual(['displayStartOrEndDate']));
