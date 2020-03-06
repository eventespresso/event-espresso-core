import React from 'react';
import { __ } from '@wordpress/i18n';

import { CalendarDateRange } from '@appCalendars/dateDisplay';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import TicketDetails from './TicketDetails';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import TicketProvider from '@edtrServices/context/TicketContext';
import CurrencyInput from '@appInputs/CurrencyInput';
import useRelations from '@appServices/apollo/relations/useRelations';
import EntityCard from '@appLayout/EntityCard';
import DatetimeIdTag from '../../../datetimes/DatetimeIdTag';
import { ListItemProps } from '@edtrInterfaces/types';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import statusBgColorClassName from '@sharedEntities/tickets/helpers/statusBgColorClassName';

const TicketCard: React.FC<ListItemProps> = ({ id }) => {
	const ticket = useTicketItem({ id });
	const { updateEntity } = useTicketMutator(id);
	const { getRelations } = useRelations();
	// get related datetimes for this datetime
	const relatedDates = getRelations({
		entity: 'tickets',
		entityId: id,
		relation: 'datetimes',
	});

	const bgClassName = statusBgColorClassName(ticket);

	return ticket ? (
		<TicketProvider id={ticket.id}>
			<EntityCard
				entity={ticket}
				actionsMenu={<TicketActionsMenu entity={ticket} />}
				sidebar={
					<CalendarDateRange
						headerText={__('sales start')}
						className={bgClassName}
						startDate={ticket.startDate}
						endDate={ticket.endDate}
					/>
				}
				details={
					<>
						<InlineEditHeading
							level={3}
							className={'entity-card-details__name'}
							onChange={(name: string): void => {
								if (name !== ticket.name) {
									updateEntity({ name });
									updateEntity({ name });
								}
							}}
						>
							{ticket.name ? ticket.name : __('Edit title...')}
						</InlineEditHeading>
						<InlineEditTextArea
							className={'entity-card-details__description'}
							onChange={(description: string): void => {
								if (description !== ticket.description) {
									updateEntity({ description });
								}
							}}
						>
							{ticket.description ? ticket.description : __('Edit description...')}
						</InlineEditTextArea>
						<CurrencyInput
							id={ticket.id}
							amount={ticket.price}
							placeholder={__('set price...')}
							inputProps={{ ellipsis: false }}
							wrapperProps={{ className: 'entity-card-details__price' }}
							onChange={({ amount: price }: any): void => {
								price = parseFloat(price);
								if (price !== ticket.price) {
									updateEntity({ price });
								}
							}}
							tag={'h3'}
						/>
						<div style={{ margin: '0 0 .5rem' }}>
							{__('Related Dates:')}{' '}
							{relatedDates.filter(Boolean).map((datetimeId) => (
								<DatetimeIdTag key={datetimeId} id={datetimeId} />
							))}
						</div>
						<TicketDetails ticket={ticket} updateTicket={updateEntity} />
					</>
				}
				reverse
			/>
		</TicketProvider>
	) : null;
};

export default TicketCard;
