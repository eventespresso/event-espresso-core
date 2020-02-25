import React from 'react';
import { Typography } from 'antd';
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
import statusBgColorClass from '../../../../../shared/entities/tickets/helpers/statusBgColorClass';

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

	const bgClass = statusBgColorClass(ticket);

	return ticket ? (
		<TicketProvider id={ticket.id}>
			<EntityCard
				entity={ticket}
				actionsMenu={<TicketActionsMenu entity={ticket} />}
				sidebar={
					<CalendarDateRange
						headerText={__('sales start')}
						className={bgClass}
						startDate={ticket.startDate}
						endDate={ticket.endDate}
					/>
				}
				details={
					<>
						<InlineEditHeading
							onChange={(name: string): void => {
								if (name !== ticket.name) {
									updateEntity({ name });
								}
							}}
						>
							{ticket.name ? ticket.name : __('Edit title...')}
						</InlineEditHeading>
						<InlineEditTextArea
							onChange={(description: string): void => {
								if (description !== ticket.description) {
									updateEntity({ description });
								}
							}}
						>
							{ticket.description ? ticket.description : __('Edit description...')}
						</InlineEditTextArea>
						<Typography.Title level={4} style={{ color: 'grey' }}>
							<CurrencyInput
								id={ticket.id}
								amount={ticket.price}
								placeholder={__('set price...')}
								onChange={({ amount: price }: any): void => {
									price = parseFloat(price);
									if (price !== ticket.price) {
										updateEntity({ price });
									}
								}}
							/>
						</Typography.Title>
						<div>
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
