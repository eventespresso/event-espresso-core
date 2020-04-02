import React from 'react';
import { __ } from '@wordpress/i18n';

import { SelectInput } from '@appInputs/SelectInput';
import { DatetimeStatus } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';

interface StatusControlProps {
	status: DatetimeStatus;
	setStatus: (status: DatetimeStatus) => void;
}

const StatusControl: React.FC<StatusControlProps> = React.memo(({ status, setStatus }) => {
	return (
		<SelectInput
			label={__('status')}
			value={status}
			options={[
				{
					value: DatetimeStatus.all,
					label: __('all dates'),
				},
				{
					value: DatetimeStatus.activeUpcoming,
					label: __('all active and upcoming'),
				},
				{
					value: DatetimeStatus.activeOnly,
					label: __('active dates only'),
				},
				{
					value: DatetimeStatus.upcomingOnly,
					label: __('upcoming dates only'),
				},
				{
					value: DatetimeStatus.nextActiveUpcomingOnly,
					label: __('next active or upcoming only'),
				},
				{
					value: DatetimeStatus.soldOutOnly,
					label: __('sold out dates only'),
				},
				{
					value: DatetimeStatus.recentlyExpiredOnly,
					label: __('recently expired dates'),
				},
				{
					value: DatetimeStatus.expiredOnly,
					label: __('all expired dates'),
				},
				{
					value: DatetimeStatus.trashedOnly,
					label: __('trashed dates only'),
				},
			]}
			onChange={setStatus}
		/>
	);
});

export default React.memo(StatusControl, getPropsAreEqual(['status']));
