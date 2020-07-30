import React from 'react';
import { __ } from '@wordpress/i18n';

import DateActionsMenu from '../actionsMenu/DateActionsMenu';
import DateCardSidebar from './DateCardSidebar';
import Details from './Details';
import EntityCard from '@appLayout/EntityCard';
import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import { EntityActionsMenuLayout } from '@appLayout/entityActionsMenu';
import { getPropsAreEqual } from '@appServices/utilities';
import { statusBgColorClassName } from '@sharedEntities/datetimes/helpers';
import { useDatesListFilterState } from '@edtrServices/filterState';
import type { DateItemProps } from '../types';

const DateCard: React.FC<DateItemProps> = ({ entity: date }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();
	const bgClassName = statusBgColorClassName(date);

	return date ? (
		<DatetimeProvider id={date.id}>
			<EntityCard
				actionsMenu={<DateActionsMenu entity={date} layout={EntityActionsMenuLayout.Vertical} />}
				cacheId={date.cacheId + displayStartOrEndDate}
				details={<Details entity={date} />}
				entity={date}
				sidebar={<DateCardSidebar entity={date} />}
				sidebarClass={bgClassName}
			/>
		</DatetimeProvider>
	) : null;
};

export default React.memo(DateCard, getPropsAreEqual(['entity', 'cacheId']));
