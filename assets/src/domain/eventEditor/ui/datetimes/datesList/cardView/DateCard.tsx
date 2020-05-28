import React from 'react';
import { __ } from '@wordpress/i18n';
import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import { EntityActionsMenuLayout } from '@appLayout/entityActionsMenu';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import { getStatusTextLabel, statusBgColorClassName } from '@sharedEntities/datetimes/helpers';

import EntityCard from '@appLayout/EntityCard';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';
import Details from './Details';
import type { DateItemProps } from '../types';
import { useMemoStringify } from '@application/services/hooks';

const DateCard: React.FC<DateItemProps> = ({ entity: date }) => {
	const bgClassName = statusBgColorClassName(date);
	const { displayStartOrEndDate } = useDatesListFilterState();
	const footer = getStatusTextLabel(date);
	const labels = useMemoStringify({ footer });

	return date ? (
		<DatetimeProvider id={date.id}>
			<EntityCard
				entity={date}
				cacheId={date.cacheId + displayStartOrEndDate}
				actionsMenu={<DateActionsMenu entity={date} layout={EntityActionsMenuLayout.Vertical} />}
				sidebar={
					<CalendarDateSwitcher
						className={bgClassName}
						displayDate={displayStartOrEndDate}
						endDate={date.endDate}
						labels={labels}
						startDate={date.startDate}
					/>
				}
				details={<Details entity={date} />}
			/>
		</DatetimeProvider>
	) : null;
};

export default React.memo(DateCard, getPropsAreEqual(['entity', 'cacheId']));
