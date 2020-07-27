import React from 'react';
import { __ } from '@wordpress/i18n';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import Details from './Details';
import EntityCard from '@appLayout/EntityCard';
import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';
import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import { EntityActionsMenuLayout } from '@appLayout/entityActionsMenu';
import { getPropsAreEqual } from '@appServices/utilities';
import { getStatusTextLabel, statusBgColorClassName } from '@sharedEntities/datetimes/helpers';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { useMemoStringify } from '@application/services/hooks';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ entity: date }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();

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
				sidebarClassName={bgClassName}
			/>
		</DatetimeProvider>
	) : null;
};

export default React.memo(DateCard, getPropsAreEqual(['entity', 'cacheId']));
