import React from 'react';
import { parseISO } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { CalendarDateRange } from '@appCalendars/dateDisplay';
import DateDetails from './DateDetails';
import DateActionsMenu from '../actionsMenu/DateActionsMenu';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import statusBgColorClassName from '@sharedEntities/datetimes/helpers/statusBgColorClassName';

import EntityCard from '@appLayout/EntityCard';
import { EntityListItemProps } from '@appLayout/entityList';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';

const DateCard: React.FC<EntityListItemProps> = ({ id }) => {
	const date = useDatetimeItem({ id });
	const { updateEntity } = useDatetimeMutator(id);

	const startDate = parseISO(date.startDate) || PLUS_ONE_MONTH;
	const endDate = parseISO(date.endDate) || PLUS_TWO_MONTHS;

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
					<CalendarDateRange
						headerText={__('starts')}
						className={bgClassName}
						startDate={startDate}
						endDate={endDate}
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
};

export default DateCard;
