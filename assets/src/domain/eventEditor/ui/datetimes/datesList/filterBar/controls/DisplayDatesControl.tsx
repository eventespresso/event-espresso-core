/**
 * External imports
 */
import React, { useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DisplayDates } from '@edtrInterfaces/datetimes/types';

interface DisplayDatesControlProps {
	displayDates: DisplayDates;
	setDisplayDates: (displayDates: DisplayDates) => void;
}
/**
 * filter for controlling which dates display in a list of Event Dates
 */
const DisplayDatesControl: React.FC<DisplayDatesControlProps> = ({ displayDates, setDisplayDates }) =>
	useMemo<JSX.Element>(() => {
		return (
			<SelectControl
				label={__('display')}
				className='espresso-date-list-filter-bar-display-select'
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
	}, [displayDates, setDisplayDates]);

export default DisplayDatesControl;
