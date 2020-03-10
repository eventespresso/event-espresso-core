import React from 'react';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { Ticket } from '@edtrServices/apollo/types';

const getHeaderRows = (tickets: Ticket[]) => {
	const emptyCell: Cell = {
		key: 'empty',
		type: 'cell',
		className: 'ee-rspnsv-table-column-huge',
		value: '',
	};

	const cells: Array<Cell> = tickets.map((ticket) => ({
		key: ticket.id,
		type: 'cell',
		className: 'ee-rspnsv-table-column-huge',
		value: __(ticket.name, 'event_espresso'),
	}));

	return [
		{
			cells: [emptyCell, ...cells],
			className: 'ticket-assignment-manager-table-header-row',
			key: 'ticket-assignment-manager-table-header-row',
			primary: true,
			type: 'row',
		},
	];
};

export default getHeaderRows;
