import React, { useMemo } from 'react';
/**
 * External imports
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n'; // @todo: replace with '@eventespresso/i18n'
import { DatesSortedBy } from '../../../../data/date/types';

export interface DatesSortedByControlProps {
	datesSortedBy: DatesSortedBy;
	setDatesSortedBy: (datesSortedBy: DatesSortedBy) => void;
}
/**
 * filter for controlling the sorting of a list of Event Dates
 *
 * @param {string} datesSortedBy
 * @param {Function} setDatesSortedBy
 * @return {Object} rendered control
 */
const DatesSortedByControl: React.FC<DatesSortedByControlProps> = ({
	datesSortedBy,
	setDatesSortedBy,
}): JSX.Element => {
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
						value: 'byName',
						label: __('by date name', 'event_espresso'),
					},
					{
						value: 'byId',
						label: __('by date ID', 'event_espresso'),
					},
					{
						value: 'byOrder',
						label: __('by custom order', 'event_espresso'),
					},
				]}
				onChange={setDatesSortedBy}
			/>
		);
	}, [datesSortedBy, setDatesSortedBy]);
};

export default DatesSortedByControl;
