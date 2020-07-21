import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import Details from './Details';
import EntityCard from '@appLayout/EntityCard';
import { CalendarDateSwitcher, EditDateRangeButton } from '@appCalendars/dateDisplay';
import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import { EntityActionsMenuLayout } from '@appLayout/entityActionsMenu';
import { getPropsAreEqual } from '@appServices/utilities';
import { getStatusTextLabel, statusBgColorClassName } from '@sharedEntities/datetimes/helpers';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useMemoStringify } from '@application/services/hooks';
import { useTimeZoneTime } from '@appServices/hooks';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ entity: date }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();
	const { updateEntity } = useDatetimeMutator(date.id);
	const { siteTimeToUtc } = useTimeZoneTime();

	const onEditHandler = useCallback(
		(dates: string[]): void => {
			const [start, end] = dates;
			// convert start & end dates to proper UTC "startDate" and "endDate"
			const startDate = siteTimeToUtc(new Date(start)).toISOString();
			const endDate = siteTimeToUtc(new Date(end)).toISOString();
			updateEntity({ startDate, endDate });
		},
		[date.cacheId, updateEntity]
	);
	const bgClassName = statusBgColorClassName(date);
	const footer = getStatusTextLabel(date);
	const labels = useMemoStringify({ footer });
	const sidebar = (
		<>
			<CalendarDateSwitcher
				displayDate={displayStartOrEndDate}
				endDate={date.endDate}
				labels={labels}
				startDate={date.startDate}
			/>
			<EditDateRangeButton
				endDate={date.endDate}
				header={__('Edit Event Date Start and End Dates')}
				onEditHandler={onEditHandler}
				startDate={date.startDate}
				tooltip={__("click to edit this event date's start and end dates")}
			/>
		</>
	);

	return date ? (
		<DatetimeProvider id={date.id}>
			<EntityCard
				actionsMenu={<DateActionsMenu entity={date} layout={EntityActionsMenuLayout.Vertical} />}
				cacheId={date.cacheId + displayStartOrEndDate}
				details={<Details entity={date} />}
				entity={date}
				sidebar={sidebar}
				sidebarClass={bgClassName}
			/>
		</DatetimeProvider>
	) : null;
};

export default React.memo(DateCard, getPropsAreEqual(['entity', 'cacheId']));
