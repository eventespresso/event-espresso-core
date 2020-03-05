import React from 'react';
import { __ } from '@wordpress/i18n';
import { ShowDates } from '@edtrInterfaces/datetimes/types';
import { SelectInput } from '@appInputs/SelectInput';

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
const ShowDatesControl: React.FC<ShowDatesControlProps> = React.memo(({ showDates, setShowDates }) => {
	return (
		<SelectInput
			label={__('show')}
			className='espresso-date-list-filter-bar-show-select'
			value={showDates}
			options={[
				{
					value: ShowDates.all,
					label: __('all dates'),
				},
				{
					value: ShowDates.activeUpcoming,
					label: __('all active and upcoming'),
				},
				{
					value: ShowDates.activeOnly,
					label: __('active dates only'),
				},
				{
					value: ShowDates.upcomingOnly,
					label: __('upcoming dates only'),
				},
				{
					value: ShowDates.nextActiveUpcomingOnly,
					label: __('next active or upcoming only'),
				},
				{
					value: ShowDates.soldOutOnly,
					label: __('sold out dates only'),
				},
				{
					value: ShowDates.above90Capacity,
					label: __('dates above 90% capacity'),
				},
				{
					value: ShowDates.above75Capacity,
					label: __('dates above 75% capacity'),
				},
				{
					value: ShowDates.above50Capacity,
					label: __('dates above 50% capacity'),
				},
				{
					value: ShowDates.below50Capacity,
					label: __('dates below 50% capacity'),
				},
				{
					value: ShowDates.recentlyExpiredOnly,
					label: __('recently expired dates'),
				},
				{
					value: ShowDates.expiredOnly,
					label: __('all expired dates'),
				},
				{
					value: ShowDates.trashedOnly,
					label: __('trashed dates only'),
				},
			]}
			onChange={setShowDates}
			size='large'
		/>
	);
});

export default ShowDatesControl;
