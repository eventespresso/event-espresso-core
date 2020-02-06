/**
 * External imports
 */
import React, { useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ShowDates } from '../../../../../interfaces/datetimes/types';

interface ShowDatesControlProps {
	showDates: ShowDates;
	setShowDates: (showDates: ShowDates) => void;
}
/**
 * filter for controlling which dates display in a list of Event Dates
 *
 * @param {string} showDates
 * @param {Function} setShowDates
 * @return {Object} rendered control
 */
const ShowDatesControl: React.FC<ShowDatesControlProps> = ({ showDates, setShowDates }) => {
	return useMemo<JSX.Element>(() => {
		return (
			<SelectControl
				label={__('show')}
				className='espresso-date-list-filter-bar-show-select'
				value={showDates}
				options={[
					{
						value: 'all',
						label: __('all dates'),
					},
					{
						value: 'active-upcoming',
						label: __('all active and upcoming'),
					},
					{
						value: 'active-only',
						label: __('active dates only'),
					},
					{
						value: 'upcoming-only',
						label: __('upcoming dates only'),
					},
					{
						value: 'next-active-upcoming-only',
						label: __('next active or upcoming only'),
					},
					{
						value: 'sold-out-only',
						label: __('sold out dates only'),
					},
					{
						value: 'above-90-capacity',
						label: __('dates above 90% capacity'),
					},
					{
						value: 'above-75-capacity',
						label: __('dates above 75% capacity'),
					},
					{
						value: 'above-50-capacity',
						label: __('dates above 50% capacity'),
					},
					{
						value: 'below-50-capacity',
						label: __('dates below 50% capacity'),
					},
					{
						value: 'recently-expired-only',
						label: __('recently expired dates'),
					},
					{
						value: 'expired-only',
						label: __('all expired dates'),
					},
					{
						value: 'trashed-only',
						label: __('trashed dates only'),
					},
				]}
				onChange={setShowDates}
			/>
		);
	}, [showDates, setShowDates]);
};

export default ShowDatesControl;
