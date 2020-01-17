/**
 * External imports
 */
import React, { useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n'; // @todo: replace with '@eventespresso/i18n'
import { ShowDatesControlProps } from '../../../types';

/**
 * filter for controlling which dates display in a list of Event Dates
 *
 * @param {string} showDates
 * @param {Function} setShowDates
 * @return {Object} rendered control
 */
const ShowDatesControl: React.FC<ShowDatesControlProps> = ({ showDates, setShowDates }): JSX.Element => {
	return useMemo<JSX.Element>(() => {
		return (
			<SelectControl
				label={__('show', 'event_espresso')}
				className='espresso-date-list-filter-bar-show-select'
				value={showDates}
				options={[
					{
						value: 'all',
						label: __('all dates', 'event_espresso'),
					},
					{
						value: 'active-upcoming',
						label: __('all active and upcoming', 'event_espresso'),
					},
					{
						value: 'active-only',
						label: __('active dates only', 'event_espresso'),
					},
					{
						value: 'upcoming-only',
						label: __('upcoming dates only', 'event_espresso'),
					},
					{
						value: 'next-active-upcoming-only',
						label: __('next active or upcoming only', 'event_espresso'),
					},
					{
						value: 'sold-out-only',
						label: __('sold out dates only', 'event_espresso'),
					},
					{
						value: 'above-90-capacity',
						label: __('dates above 90% capacity', 'event_espresso'),
					},
					{
						value: 'above-75-capacity',
						label: __('dates above 75% capacity', 'event_espresso'),
					},
					{
						value: 'above-50-capacity',
						label: __('dates above 50% capacity', 'event_espresso'),
					},
					{
						value: 'below-50-capacity',
						label: __('dates below 50% capacity', 'event_espresso'),
					},
					{
						value: 'recently-expired-only',
						label: __('recently expired dates', 'event_espresso'),
					},
					{
						value: 'expired-only',
						label: __('all expired dates', 'event_espresso'),
					},
					{
						value: 'trashed-only',
						label: __('trashed dates only', 'event_espresso'),
					},
				]}
				onChange={setShowDates}
			/>
		);
	}, [showDates, setShowDates]);
};

export default ShowDatesControl;
