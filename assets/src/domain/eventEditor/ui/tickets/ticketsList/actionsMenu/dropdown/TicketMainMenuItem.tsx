import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';

import CopyTicket from './CopyTicket';
import EditTicket from './EditTicket';
import TrashTicket from './TrashTicket';

const TicketMainMenuItem: React.FC = () => {
	const toggleProps: DropdownToggleProps = {
		tooltip: __('ticket main menu'),
	};
	return (
		<DropdownMenu toggleProps={toggleProps}>
			<EditTicket />
			<CopyTicket />
			<TrashTicket />
		</DropdownMenu>
	);
};

export default TicketMainMenuItem;
