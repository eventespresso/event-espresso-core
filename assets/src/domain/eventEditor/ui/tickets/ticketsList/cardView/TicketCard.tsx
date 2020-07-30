import React from 'react';
import { __ } from '@wordpress/i18n';

import Details from './Details';
import EntityCard from '@appLayout/EntityCard';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import TicketCardSidebar from './TicketCardSidebar';
import TicketProvider from '@edtrServices/context/TicketContext';
import { EntityActionsMenuLayout } from '@appLayout/entityActionsMenu';
import { statusBgColorClassName } from '@sharedEntities/tickets/helpers';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@appServices/utilities';
import type { TicketItemProps } from '../types';

const TicketCard: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { displayStartOrEndDate } = useTicketsListFilterState();
	const bgClassName = statusBgColorClassName(ticket);

	return ticket ? (
		<TicketProvider id={ticket.id}>
			<EntityCard
				actionsMenu={<TicketActionsMenu entity={ticket} layout={EntityActionsMenuLayout.Vertical} />}
				cacheId={ticket.cacheId + displayStartOrEndDate}
				details={<Details entity={ticket} />}
				entity={ticket}
				reverse
				sidebar={<TicketCardSidebar entity={ticket} />}
				sidebarClass={bgClassName}
			/>
		</TicketProvider>
	) : null;
};

export default React.memo(TicketCard, getPropsAreEqual(['entity', 'cacheId']));
