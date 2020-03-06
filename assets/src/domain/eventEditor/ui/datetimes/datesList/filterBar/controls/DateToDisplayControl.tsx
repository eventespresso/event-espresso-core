import React from 'react';
import { __ } from '@wordpress/i18n';
import { DisplayDates } from '@edtrInterfaces/shared/types';
import { SelectInput } from '@appInputs/SelectInput';
import { SetDisplayDatesInterface } from '../useDatesListFilterState/types';

interface DisplayDatesControlProps {
	displayDates: DisplayDates;
	setDisplayDates: SetDisplayDatesInterface;
}
/**
 * filter for controlling which dates display in a list of Event Dates
 */
const DateToDisplayControl: React.FC<DateToDisplayControlProps> = React.memo(({ dateToDisplay, setDateToDisplay }) => {
	return (
		<SelectInput
			label={__('display')}
			className='ee-date-list-filter-bar-display-select'
			value={displayDates}
			options={[
				{
					value: DateToDisplay.start,
					label: __('start dates only'),
				},
				{
					value: DateToDisplay.end,
					label: __('end dates only'),
				},
				{
					value: DateToDisplay.both,
					label: __('start and end dates'),
				},
			]}
			onChange={setDisplayDates}
		/>
	);
});

export default DateToDisplayControl;
