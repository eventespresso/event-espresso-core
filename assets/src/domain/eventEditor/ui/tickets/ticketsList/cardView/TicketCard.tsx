import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import Details from './Details';
import EntityCard from '@appLayout/EntityCard';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import TicketProvider from '@edtrServices/context/TicketContext';
import { CalendarDateSwitcher, EditDateRangeButton } from '@appCalendars/dateDisplay';
import { EntityActionsMenuLayout } from '@appLayout/entityActionsMenu';
import { getStatusTextLabel, statusBgColorClassName } from '@sharedEntities/tickets/helpers';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';
import { useMemoStringify } from '@application/services/hooks';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { useTimeZoneTime } from '@appServices/hooks';
import type { TicketItemProps } from '../types';

const TicketCard: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { displayStartOrEndDate } = useTicketsListFilterState();
	const { updateEntity } = useTicketMutator(ticket.id);
	const { siteTimeToUtc } = useTimeZoneTime();

	const onEditHandler = useCallback(
		(dates: string[]): void => {
			const [start, end] = dates;
			// convert start & end dates to proper UTC "startDate" and "endDate"
			const startDate = siteTimeToUtc(new Date(start)).toISOString();
			const endDate = siteTimeToUtc(new Date(end)).toISOString();
			updateEntity({ startDate, endDate });
		},
		[ticket.cacheId, updateEntity]
	);
	const bgClassName = statusBgColorClassName(ticket);
	const footer = getStatusTextLabel(ticket);
	const labels = useMemoStringify({ footer });
	const sidebar = (
		<>
			<CalendarDateSwitcher
				displayDate={displayStartOrEndDate}
				endDate={ticket.endDate}
				labels={labels}
				startDate={ticket.startDate}
			/>
			<EditDateRangeButton
				endDate={ticket.endDate}
				header={__('Edit Ticket Sales Start and End Dates')}
				onEditHandler={onEditHandler}
				tooltip={__('click to edit the ticket sales start and end dates')}
				startDate={ticket.startDate}
			/>
		</>
	);

	return ticket ? (
		<TicketProvider id={ticket.id}>
			<EntityCard
				actionsMenu={<TicketActionsMenu entity={ticket} layout={EntityActionsMenuLayout.Vertical} />}
				cacheId={ticket.cacheId + displayStartOrEndDate}
				details={<Details entity={ticket} />}
				entity={ticket}
				reverse
				sidebar={sidebar}
				sidebarClass={bgClassName}
			/>
		</TicketProvider>
	) : null;
};

export default React.memo(TicketCard, getPropsAreEqual(['entity', 'cacheId']));
