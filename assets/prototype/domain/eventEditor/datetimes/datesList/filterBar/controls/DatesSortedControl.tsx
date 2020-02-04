/**
 * External imports
 */
import React, { useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DatesSorted } from '../../../../data/date/types';

interface DatesSortedControlProps {
	datesSortedBy: DatesSorted;
	setDatesSortedBy: (datesSortedBy: DatesSorted) => void;
}
/**
 * filter for controlling the sorting of a list of Event Dates
 *
 * @param {string} datesSortedBy
 * @param {Function} setDatesSortedBy
 * @return {Object} rendered control
 */
const DatesSortedControl: React.FC<DatesSortedControlProps> = ({ datesSortedBy, setDatesSortedBy }): JSX.Element => {
	return useMemo(() => {
		return (
			<SelectControl
				label={__('sort')}
				className='espresso-date-list-filter-bar-order-select'
				value={datesSortedBy}
				options={[
					{
						value: 'chronologically',
						label: __('chronologically'),
					},
					{
						value: 'byName',
						label: __('by date name'),
					},
					{
						value: 'byId',
						label: __('by date ID'),
					},
					{
						value: 'byOrder',
						label: __('by custom order'),
					},
				]}
				onChange={setDatesSortedBy}
			/>
		);
	}, [datesSortedBy, setDatesSortedBy]);
};

export default DatesSortedControl;
