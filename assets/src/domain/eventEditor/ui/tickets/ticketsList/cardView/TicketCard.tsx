import React from 'react';
import { __ } from '@wordpress/i18n';

import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import TicketDetails from './TicketDetails';
import TicketProvider from '@edtrServices/context/TicketContext';
import CurrencyInput from '@appInputs/CurrencyInput';
import EntityCard from '@appLayout/EntityCard';
import { EntityListItemProps } from '@appLayout/entityList';
import { InlineEditHeading, InlineEditTextArea } from '@appInputs/InlineEditInput';
import statusBgColorClassName from '@sharedEntities/tickets/helpers/statusBgColorClassName';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { Ticket } from '@edtrServices/apollo/types';
import { getPropsAreEqual } from '@appServices/utilities';

const TicketCard: React.FC<EntityListItemProps<Ticket>> = ({ entity: ticket }) => {
	const { displayStartOrEndDate } = useTicketsListFilterState();
	const { updateEntity } = useTicketMutator(ticket.id);

	const bgClassName = statusBgColorClassName(ticket);

	return ticket ? (
		<TicketProvider id={ticket.id}>
			<EntityCard
				entity={ticket}
				cacheId={ticket.cacheId + displayStartOrEndDate}
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
};

export default React.memo(TicketCard, getPropsAreEqual(['entity', 'cacheId']));
