import React from 'react';
import { __ } from '@wordpress/i18n';
import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';

import DateDetails from './DateDetails';
import DateActionsMenu from '../actionsMenu/DateActionsMenu';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';
import statusBgColorClassName from '@sharedEntities/datetimes/helpers/statusBgColorClassName';

import EntityCard from '@appLayout/EntityCard';
import { EntityListItemProps } from '@appLayout/entityList';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const DateCard: React.FC<EntityListItemProps> = React.memo(({ id }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();
	const date = useDatetimeItem({ id });
	const { updateEntity } = useDatetimeMutator(id);

	if (!date) {
		return null;
	}

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
});

export default DateCard;
