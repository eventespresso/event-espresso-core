import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';

import CopyTicket from './CopyTicket';
import EditTicket from './EditTicket';
import TrashTicket from './TrashTicket';

import { TicketMainMenuProps } from './types';

const TicketMainMenu: React.FC<TicketMainMenuProps> = ({ ticket }) => {
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
