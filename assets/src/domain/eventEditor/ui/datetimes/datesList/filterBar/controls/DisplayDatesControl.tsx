import React from 'react';
import { __ } from '@wordpress/i18n';
import { DisplayDates } from '@edtrInterfaces/datetimes/types';
import { SelectInput } from '@appInputs/SelectInput';
import { SetDisplayDatesInterface } from '../useDatesListFilterState/types';

interface DisplayDatesControlProps {
	displayDates: DisplayDates;
	setDisplayDates: SetDisplayDatesInterface;
}
/**
 * filter for controlling which dates display in a list of Event Dates
 */
const DisplayDatesControl: React.FC<DisplayDatesControlProps> = React.memo(({ displayDates, setDisplayDates }) => {
	return (
		<SelectInput
			label={__('display')}
			className='ee-date-list-filter-bar-display-select'
			value={displayDates}
			options={[
				{
					value: DisplayDates.start,
					label: __('start dates only'),
				},
				{
					value: DisplayDates.end,
					label: __('end dates only'),
				},
				{
					value: DisplayDates.both,
					label: __('start and end dates'),
				},
			]}
			onChange={setDisplayDates}
		/>
	);
});

export default DisplayDatesControl;
