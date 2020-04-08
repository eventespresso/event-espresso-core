import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@appInputs/SelectInput';
import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';
import { TicketsFilterStateManager } from '@edtrServices/filterState';

type DisplayStartOrEndDateControlProps = Pick<
	TicketsFilterStateManager,
	'displayStartOrEndDate' | 'setDisplayStartOrEndDate'
>;

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
						label: __('ticket sales start date only'),
					},
					{
						value: DisplayStartOrEndDate.end,
						label: __('ticket sales end date only'),
					},
					{
						value: DisplayStartOrEndDate.both,
						label: __('ticket sales start and end dates'),
					},
				]}
				onChangeValue={setDisplayStartOrEndDate}
			/>
		);
	}
);

export default React.memo(DisplayStartOrEndDateControl, getPropsAreEqual(['displayStartOrEndDate']));
