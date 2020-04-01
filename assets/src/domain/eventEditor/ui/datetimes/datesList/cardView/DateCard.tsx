import React from 'react';
import { __ } from '@wordpress/i18n';
import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';

import DateDetails from './DateDetails';
import DateActionsMenu from '../actionsMenu/DateActionsMenu';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import statusBgColorClassName from '@sharedEntities/datetimes/helpers/statusBgColorClassName';

import EntityCard from '@appLayout/EntityCard';
import type { EntityListItemProps } from '@appLayout/entityList';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import type { Datetime } from '@edtrServices/apollo/types';
import { getPropsAreEqual } from '@appServices/utilities';

const DateCard: React.FC<EntityListItemProps<Datetime>> = React.memo(({ entity: date }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();

	const { updateEntity } = useDatetimeMutator(date.id);

	const bgClassName = statusBgColorClassName(date);

	return date ? (
		<DatetimeProvider id={date.id}>
			<EntityCard
				entity={date}
				actionsMenu={<DateActionsMenu entity={date} />}
				sidebar={
					<CalendarDateSwitcher
						className={bgClassName}
						displayDate={displayStartOrEndDate}
						endDate={date.endDate}
						startDate={date.startDate}
					/>
				}
				details={
					<>
						<InlineEditHeading
							level={3}
							className={'entity-card-details__name'}
							onChange={(name: string): void => {
								if (name !== date.name) {
									updateEntity({ name });
								}
							}}
						>
							{date.name ? date.name : __('Edit title...')}
						</InlineEditHeading>
						<InlineEditTextArea
							className={'entity-card-details__description'}
							onChange={(description: string): void => {
								if (description !== date.description) {
									updateEntity({ description });
								}
							}}
						>
							{date.description ? date.description : __('Edit description...')}
						</InlineEditTextArea>
						<DateDetails datetime={date} />
					</>
				}
			/>
		</DatetimeProvider>
	) : null;
}, getPropsAreEqual(['entity', 'cacheId']));

export default DateCard;
