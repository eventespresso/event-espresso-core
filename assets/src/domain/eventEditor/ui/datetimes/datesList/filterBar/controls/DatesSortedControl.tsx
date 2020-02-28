/**
 * External imports
 */
import React, { useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DatesSorted } from '@edtrInterfaces/datetimes/types';

interface DatesSortedControlProps {
	datesSortedBy: DatesSorted;
	setDatesSortedBy: (datesSortedBy: DatesSorted) => void;
}
/**
 * filter for controlling the sorting of a list of Event Dates
 */
const DatesSortedControl: React.FC<DatesSortedControlProps> = ({ datesSortedBy, setDatesSortedBy }) => {
	return useMemo(() => {
		return (
			<SelectControl
				label={__('sort')}
				className='espresso-date-list-filter-bar-order-select'
				value={datesSortedBy}
				options={[
					{
						value: DatesSorted.chronologically,
						label: __('chronologically'),
					},
					{
						value: DatesSorted.byName,
						label: __('by date name'),
					},
					{
						value: DatesSorted.byId,
						label: __('by date ID'),
					},
					{
						value: DatesSorted.byOrder,
						label: __('by custom order'),
					},
				]}
				onChange={setDatesSortedBy}
			/>
		);
	}, [datesSortedBy, setDatesSortedBy]);
};

export default DatesSortedControl;
