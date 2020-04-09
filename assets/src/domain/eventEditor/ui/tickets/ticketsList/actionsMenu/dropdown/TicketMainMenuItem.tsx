import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenu } from '@application/ui/layout';
import { Icon } from '@application/ui/input';

import CopyTicket from './CopyTicket';
import EditTicket from './EditTicket';
import TrashTicket from './TrashTicket';

const TicketMainMenuItem: React.FC = () => {
	const toggleProps = {
		label: __('ticket main menu'),
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
