import React from 'react';
import { __ } from '@wordpress/i18n';

import { SelectInput } from '@appInputs/SelectInput';
import { Status } from '@edtrServices/filterState';

interface StatusControlProps {
	status: Status;
	setStatus: (datetimesToShow: Status) => void;
}

const StatusControl: React.FC<StatusControlProps> = React.memo(({ status, setStatus }) => {
	return (
		<SelectInput
			label={__('status')}
			className='espresso-date-list-filter-bar-show-select ee-filter-bar-filter--big'
			value={status}
			options={[
				{
					value: Status.all,
					label: __('all dates'),
				},
				{
					value: Status.activeUpcoming,
					label: __('all active and upcoming'),
				},
				{
					value: Status.activeOnly,
					label: __('active dates only'),
				},
				{
					value: Status.upcomingOnly,
					label: __('upcoming dates only'),
				},
				{
					value: Status.nextActiveUpcomingOnly,
					label: __('next active or upcoming only'),
				},
				{
					value: Status.soldOutOnly,
					label: __('sold out dates only'),
				},
				{
					value: Status.recentlyExpiredOnly,
					label: __('recently expired dates'),
				},
				{
					value: Status.expiredOnly,
					label: __('all expired dates'),
				},
				{
					value: Status.trashedOnly,
					label: __('trashed dates only'),
				},
			]}
			onChange={setStatus}
		/>
	);
});

export default StatusControl;
