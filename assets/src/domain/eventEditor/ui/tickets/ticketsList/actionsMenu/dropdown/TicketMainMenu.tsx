import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';

import CopyTicket from './CopyTicket';
import EditTicket from './EditTicket';
import TrashTicket from './TrashTicket';

import { TicketMainMenuProps } from './types';

const TicketMainMenu: React.FC<TicketMainMenuProps> = ({ id }) => {
	const toggleProps: DropdownToggleProps = {
		tooltip: __('ticket main menu'),
	};

	return (
		<DropdownMenu toggleProps={toggleProps}>
			<EditTicket id={id} />
			<CopyTicket id={id} />
			<TrashTicket id={id} />
		</DropdownMenu>
	);
};

export default TicketMainMenu;
