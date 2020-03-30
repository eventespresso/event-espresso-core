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
import { Datetime } from '@edtrServices/apollo/types';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const DateCard: React.FC<EntityListItemProps<Datetime>> = ({ entity }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();
	const date = useDatetimeItem({ id: entity.id });
	const { updateEntity } = useDatetimeMutator(entity.id);

	if (!date) {
		return null;
	}

	const bgClassName = statusBgColorClassName(date);

	return (
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
	);
};

const hasEntityChanged = (
	prevProps: EntityListItemProps<Datetime>,
	nextProps: EntityListItemProps<Datetime>
): boolean => {
	const prevEntity = JSON.stringify(prevProps.entity);
	const nextEntity = JSON.stringify(nextProps.entity);
	console.log('');
	console.log('%c DateCard ', 'color: LimeGreen;');
	console.log('%c 	prevEntity', 'color: LimeGreen;', prevEntity);
	console.log('%c 	nextEntity', 'color: LimeGreen;', nextEntity);
	console.log('%c 	prevEntity === nextEntity', 'color: LimeGreen;', prevEntity === nextEntity);
	return prevEntity === nextEntity;
};

export default React.memo(DateCard, hasEntityChanged);
