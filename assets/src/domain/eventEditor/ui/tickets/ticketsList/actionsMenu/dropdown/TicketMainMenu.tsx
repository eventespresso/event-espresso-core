import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';

import CopyTicket from './CopyTicket';
import EditTicket from './EditTicket';
import TrashTicket from './TrashTicket';
import { useTicketItem } from '@edtrServices/apollo';

import { TicketMainMenuProps } from './types';

const TicketMainMenu: React.FC<TicketMainMenuProps> = ({ ticket: entity }) => {
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const ticket = useTicketItem({ id: entity.id });
	const toggleProps: DropdownToggleProps = {
		tooltip: __('ticket main menu'),
	};

	return (
		<DropdownMenu toggleProps={toggleProps}>
			<EditTicket ticket={ticket} />
			<CopyTicket ticket={ticket} />
			<TrashTicket ticket={ticket} />
		</DropdownMenu>
	);
};

export default TicketMainMenu;
