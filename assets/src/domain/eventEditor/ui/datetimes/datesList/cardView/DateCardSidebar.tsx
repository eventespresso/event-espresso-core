import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { CalendarDateSwitcher, EditDateRangeButton } from '@appCalendars/dateDisplay';
import { getPropsAreEqual } from '@appServices/utilities';
import { getStatusTextLabel } from '@sharedEntities/datetimes/helpers';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useTimeZoneTime } from '@appServices/hooks';
import type { DateItemProps } from '../types';
import { DateRange } from '@infraUI/inputs/dateTime';

const DateCardSidebar: React.FC<DateItemProps> = ({ entity: date }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();
	const { updateEntity } = useDatetimeMutator(date.id);
	const { siteTimeToUtc } = useTimeZoneTime();

	const onEditHandler = useCallback(
		([start, end]: DateRange): void => {
			// convert start & end dates to proper UTC "startDate" and "endDate"
			const startDate = siteTimeToUtc(start).toISOString();
			const endDate = siteTimeToUtc(end).toISOString();
			updateEntity({ startDate, endDate });
		},
		[siteTimeToUtc, updateEntity]
	);
	const statusText = getStatusTextLabel(date);

	return date ? (
		<>
			<CalendarDateSwitcher
				displayDate={displayStartOrEndDate}
				endDate={date.endDate}
				startDate={date.startDate}
			/>
			<EditDateRangeButton
				endDate={date.endDate}
				header={__('Edit Event Date Start and End Dates')}
				onEditHandler={onEditHandler}
				startDate={date.startDate}
				tooltip={__('edit start and end dates')}
			/>
			<div className={'ee-ticket-status-label'}>{statusText}</div>
		</>
	) : null;
};

export default React.memo(DateCardSidebar, getPropsAreEqual(['entity', 'cacheId']));
