import React from 'react';
import { __ } from '@wordpress/i18n';

import { CalendarDateSwitcher } from '@appCalendars/dateDisplay';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import Details from './Details';
import TicketProvider from '@edtrServices/context/TicketContext';
import EntityCard from '@appLayout/EntityCard';
import { getStatusTextLabel, statusBgColorClassName } from '@sharedEntities/tickets/helpers';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';
import type { TicketItemProps } from '../types';

const TicketCard: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { displayStartOrEndDate } = useTicketsListFilterState();
	const bgClassName = statusBgColorClassName(ticket);
	const footer = getStatusTextLabel(ticket);

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
						labels={{ footer }}
						startDate={ticket.startDate}
					/>
				}
				details={<Details entity={ticket} />}
				reverse
			/>
		</TicketProvider>
	) : null;
};

export default React.memo(TicketCard, getPropsAreEqual(['entity', 'cacheId']));
