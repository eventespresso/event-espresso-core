/**
 * External imports
 */
import React, { useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DisplayDates } from '../../../../data/date/types';

interface DisplayDatesControlProps {
	displayDates: DisplayDates;
	setDisplayDates: (displayDates: DisplayDates) => void;
}
/**
 * filter for controlling which dates display in a list of Event Dates
 *
 * @param {string} displayDates
 * @param {Function} setDisplayDates
 * @return {Object} rendered control
 */
const DisplayDatesControl: React.FC<DisplayDatesControlProps> = ({ displayDates, setDisplayDates }): JSX.Element =>
	useMemo<JSX.Element>(() => {
		return (
			<SelectControl
				label={__('display', 'event_espresso')}
				className='espresso-date-list-filter-bar-display-select'
				value={displayDates}
				options={[
					{
						value: 'start',
						label: __('start dates only', 'event_espresso'),
					},
					{
						value: 'end',
						label: __('end dates only', 'event_espresso'),
					},
					{
						value: 'both',
						label: __('start and end dates', 'event_espresso'),
					},
				]}
				onChange={setDisplayDates}
			/>
		);
	}, [displayDates, setDisplayDates]);

export default DisplayDatesControl;
