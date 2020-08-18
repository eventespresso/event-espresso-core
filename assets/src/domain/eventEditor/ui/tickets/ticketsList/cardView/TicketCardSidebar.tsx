import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { CalendarDateSwitcher, EditDateRangeButton } from '@appCalendars/dateDisplay';
import { getStatusTextLabel } from '@sharedEntities/tickets/helpers';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { useTimeZoneTime } from '@appServices/hooks';
import type { TicketItemProps } from '../types';
import { DateRange } from '@infraUI/inputs/dateTime';

const TicketCardSidebar: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { displayStartOrEndDate } = useTicketsListFilterState();
	const { updateEntity } = useTicketMutator(ticket.id);
	const { siteTimeToUtc } = useTimeZoneTime();

	const onEditHandler = useCallback(
		([start, end]: DateRange): void => {
			// convert start & end dates to proper UTC "startDate" and "endDate"
			const startDate = siteTimeToUtc(start).toISOString();
			const endDate = siteTimeToUtc(end).toISOString();
			updateEntity({ startDate, endDate });
		},
		[siteTimeToUtc, updateEntity]
	);
	const statusText = getStatusTextLabel(ticket);

	return ticket ? (
		<>
			<CalendarDateSwitcher
				displayDate={displayStartOrEndDate}
				endDate={ticket.endDate}
				startDate={ticket.startDate}
			/>
			<EditDateRangeButton
				endDate={ticket.endDate}
				header={__('Edit Ticket Sales Start and End Dates')}
				onEditHandler={onEditHandler}
				tooltip={__('edit ticket sales start and end dates')}
				startDate={ticket.startDate}
			/>
			<div className={'ee-ticket-status-label'}>{statusText}</div>
		</>
	) : null;
};

export default React.memo(TicketCardSidebar, getPropsAreEqual(['entity', 'cacheId']));
