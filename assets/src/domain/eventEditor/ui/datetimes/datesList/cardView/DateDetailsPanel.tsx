import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { EditDateRangeButton } from '@appCalendars/dateDisplay';
import { EntityDetailsPanel, Sold } from '@application/ui/display/entityDetailsPanel';
import DateRegistrationsLink from '../../DateRegistrationsLink';
import DateCapacity from './DateCapacity';
import { getPropsAreEqual } from '@appServices/utilities';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useTimeZoneTime } from '@appServices/hooks';

import type { DateItemProps } from '../types';

const DateDetailsPanel: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);
	const { siteTimeToUtc } = useTimeZoneTime();

	const onEditHandler = useCallback(
		(dates: string[]): void => {
			const [start, end] = dates;
			// convert start & end dates to proper UTC "startDate" and "endDate"
			const startDate = siteTimeToUtc(new Date(start)).toISOString();
			const endDate = siteTimeToUtc(new Date(end)).toISOString();
			updateEntity({ startDate, endDate });
		},
		[datetime.cacheId, updateEntity]
	);

	const details = [
		{
			id: 'ee-event-date-sold',
			label: __('sold'),
			value: <Sold dbId={datetime.dbId} sold={datetime.sold} type='date' />,
		},
		{
			id: 'ee-event-date-capacity',
			label: __('capacity'),
			value: <DateCapacity entity={datetime} />,
		},
		{
			id: 'ee-event-date-range',
			label: __('date range'),
			value: (
				<EditDateRangeButton
					endDate={datetime.endDate}
					header={__('Edit Event Date Start and End Dates')}
					onEditHandler={onEditHandler}
					startDate={datetime.startDate}
					tooltip={__("click to edit this event date's start and end dates")}
				/>
			),
		},
		{
			id: 'ee-event-date-registrations',
			className: 'ee-has-tooltip',
			label: __('reg list'),
			value: <DateRegistrationsLink datetime={datetime} />,
		},
	];

	return <EntityDetailsPanel details={details} className='ee-editor-date-details-sold-rsrvd-cap-div' />;
};

export default React.memo(DateDetailsPanel, getPropsAreEqual(['entity', 'cacheId']));
