import React from 'react';
import { __ } from '@wordpress/i18n';

import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import TicketDetails from './TicketDetails';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import TicketProvider from '@edtrServices/context/TicketContext';
import CurrencyInput from '@appInputs/CurrencyInput';
import EntityCard from '@appLayout/EntityCard';
import { EntityListItemProps } from '@appLayout/entityList';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import statusBgColorClassName from '@sharedEntities/tickets/helpers/statusBgColorClassName';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

const TicketCard: React.FC<EntityListItemProps> = React.memo(({ id }) => {
	const { displayStartOrEndDate } = useTicketsListFilterState();
	const ticket = useTicketItem({ id });
	const { updateEntity } = useTicketMutator(id);

	const bgClassName = statusBgColorClassName(ticket);

	return ticket ? (
		<TicketProvider id={ticket.id}>
			<EntityCard
				entity={ticket}
				actionsMenu={<TicketActionsMenu entity={ticket} />}
				sidebar={
					<CalendarDateSwitcher
						className={bgClassName}
						displayDate={displayStartOrEndDate}
						endDate={ticket.endDate}
						startDate={ticket.startDate}
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
						<TicketDetails ticket={ticket} />
					</>
				}
				reverse
			/>
		</TicketProvider>
	) : null;
});

export default TicketCard;
