import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenu } from '@application/ui/layout';
import { Icon } from '@application/ui/input';

import CopyTicket from './CopyTicket';
import EditTicket from './EditTicket';
import TrashTicket from './TrashTicket';

const TicketMainMenuItem: React.FC = () => (
	<EspressoDropdownMenu icon={Icon.MORE} label={__('event ticket main menu')}>
		<EditTicket />
		<CopyTicket />
		<TrashTicket />
	</EspressoDropdownMenu>
);

export default TicketMainMenuItem;
