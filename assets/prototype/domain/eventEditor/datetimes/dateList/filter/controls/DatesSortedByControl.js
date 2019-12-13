/**
 * External imports
 */
import { SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * filter for controlling the sorting of a list of Event Dates
 *
 * @param {string} datesSortedBy
 * @param {Function} setDatesSortedBy
 * @return {Object} rendered control
 */
const DatesSortedByControl = ({ datesSortedBy, setDatesSortedBy }) => {
	return useMemo(() => {
		return (
			<SelectControl
				label={__('sort', 'event_espresso')}
				className='espresso-date-list-filter-bar-order-select'
				value={datesSortedBy}
				options={[
					{
						value: 'chronologically',
						label: __('chronologically', 'event_espresso'),
					},
					{
						value: 'by-name',
						label: __('by date name', 'event_espresso'),
					},
					{
						value: 'by-id',
						label: __('by date ID', 'event_espresso'),
					},
					{
						value: 'by-order',
						label: __('by custom order', 'event_espresso'),
					},
				]}
				onChange={setDatesSortedBy}
			/>
		);
	}, [datesSortedBy, setDatesSortedBy]);
};

export default DatesSortedByControl;
