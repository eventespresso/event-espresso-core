import React from 'react';
import { __ } from '@wordpress/i18n';
import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import statusBgColorClassName from '@sharedEntities/datetimes/helpers/statusBgColorClassName';

import EntityCard from '@appLayout/EntityCard';
import type { EntityListItemProps } from '@appLayout/entityList';
import { useDatesListFilterState } from '@edtrServices/filterState';
import type { Datetime } from '@edtrServices/apollo/types';
import { getPropsAreEqual } from '@appServices/utilities';
import Details from './Details';

const DateCard: React.FC<EntityListItemProps<Datetime>> = ({ entity: date }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();

	const bgClassName = statusBgColorClassName(date);

	return date ? (
		<DatetimeProvider id={date.id}>
			<EntityCard
				entity={date}
				cacheId={date.cacheId + displayStartOrEndDate}
				actionsMenu={<DateActionsMenu entity={date} />}
				sidebar={
					<CalendarDateSwitcher
						className={bgClassName}
						displayDate={displayStartOrEndDate}
						endDate={date.endDate}
						startDate={date.startDate}
					/>
				}
				details={<Details datetime={date} />}
			/>
		</DatetimeProvider>
	) : null;
};

export default React.memo(DateCard, getPropsAreEqual(['entity', 'cacheId']));
