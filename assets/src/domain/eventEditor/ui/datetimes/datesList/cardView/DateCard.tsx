// @ts-nocheck
import React, { useState } from 'react';
import { parseISO } from 'date-fns';
import { __ } from '@wordpress/i18n';

import { CalendarDateRange } from '@appCalendars';
import DateDetails from './DateDetails';
import DateActionsMenu from '../actionsMenu/DateActionsMenu';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';
import TicketIdTag from '../../../tickets/TicketIdTag';

import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import statusBgColorClassName from '@sharedEntities/datetimes/helpers/statusBgColorClassName';

import useRelations from '@appServices/apollo/relations/useRelations';
import { useStatus, TypeName } from '@appServices/apollo/status';
import EntityCard from '@appLayout/EntityCard';
import { ListItemProps } from '@edtrInterfaces';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';

const DateCard: React.FC<ListItemProps> = ({ id }) => {
	const date = useDatetimeItem({ id });
	const { isLoaded } = useStatus();
	const { updateEntity } = useDatetimeMutator(id);
	const { getRelations } = useRelations();

	const startDate = parseISO(date.startDate) || PLUS_ONE_MONTH;
	const endDate = parseISO(date.endDate) || PLUS_TWO_MONTHS;
	const defaultRangeValues: [Date, Date] = [startDate, endDate];
	const [range, setRange] = useState<[Date, Date]>(defaultRangeValues);

	if (!date) {
		return null;
	}

	const ticketsLoaded = isLoaded(TypeName.tickets);

	// get related ticket IDs for this datetime
	const relatedTicketIds =
		ticketsLoaded &&
		getRelations({
			entity: 'datetimes',
			entityId: id,
			relation: 'tickets',
		});

	let relatedTicketTags =
		ticketsLoaded &&
		relatedTicketIds.filter(Boolean).map((ticketId) => <TicketIdTag key={ticketId} id={ticketId} />);
	relatedTicketTags = relatedTicketTags ? relatedTicketTags : __('none');

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
						startDate={range[0]}
						endDate={range[1]}
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
						{/* the following will be replaced by the entity details panel */}
						<div style={{ margin: '0 0 .5rem' }}>
							{__('Related Tickets:') + ' '}
							{relatedTicketTags}
						</div>
						<DateDetails datetime={date} updateDatetime={updateEntity} />
					</>
				}
			/>
		</DatetimeProvider>
	) : null;
};

export default DateCard;
