/**
 * External imports
 */
import { SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * filter for controlling which dates display in a list of Event Dates
 *
 * @param {string} displayDates
 * @param {Function} setDisplayDates
 * @return {Object} rendered control
 */
const DisplayDatesControl = ({ displayDates, setDisplayDates }) =>
	useMemo(() => {
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
