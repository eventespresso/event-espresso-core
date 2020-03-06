import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@appInputs/SelectInput';
import { DatetimesToShow } from '@edtrServices/filterState';

interface DatetimesToShowControlProps {
	datetimesToShow: DatetimesToShow;
	setDatetimesToShow: (datetimesToShow: DatetimesToShow) => void;
}
/**
 * filter for controlling which dates display in a list of Event Dates
 *
 * @param {string} datetimesToShow
 * @param {Function} setDatetimesToShow
 * @return {Object} rendered control
 */
const DatetimesToShowControl: React.FC<DatetimesToShowControlProps> = React.memo(
	({ datetimesToShow, setDatetimesToShow }) => {
		return (
			<SelectInput
				label={__('show')}
				className='espresso-date-list-filter-bar-show-select'
				value={datetimesToShow}
				options={[
					{
						value: DatetimesToShow.all,
						label: __('all dates'),
					},
					{
						value: DatetimesToShow.activeUpcoming,
						label: __('all active and upcoming'),
					},
					{
						value: DatetimesToShow.activeOnly,
						label: __('active dates only'),
					},
					{
						value: DatetimesToShow.upcomingOnly,
						label: __('upcoming dates only'),
					},
					{
						value: DatetimesToShow.nextActiveUpcomingOnly,
						label: __('next active or upcoming only'),
					},
					{
						value: DatetimesToShow.soldOutOnly,
						label: __('sold out dates only'),
					},
					{
						value: DatetimesToShow.above90Capacity,
						label: __('dates above 90% capacity'),
					},
					{
						value: DatetimesToShow.above75Capacity,
						label: __('dates above 75% capacity'),
					},
					{
						value: DatetimesToShow.above50Capacity,
						label: __('dates above 50% capacity'),
					},
					{
						value: DatetimesToShow.below50Capacity,
						label: __('dates below 50% capacity'),
					},
					{
						value: DatetimesToShow.recentlyExpiredOnly,
						label: __('recently expired dates'),
					},
					{
						value: DatetimesToShow.expiredOnly,
						label: __('all expired dates'),
					},
					{
						value: DatetimesToShow.trashedOnly,
						label: __('trashed dates only'),
					},
				]}
				onChange={setDatetimesToShow}
				size='large'
			/>
		);
	}
);

export default DatetimesToShowControl;
