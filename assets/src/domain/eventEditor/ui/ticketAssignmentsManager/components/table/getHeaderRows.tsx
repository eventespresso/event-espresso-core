import classNames from 'classnames';

import { Cell } from '@appLayout/espressoTable';
import { Ticket } from '@edtrServices/apollo/types';
import useColClassName from './useColClassName';

const getHeaderRows = (tickets: Ticket[]) => {
	const getColClass = useColClassName();

	const emptyCell: Cell = {
		key: 'empty',
		type: 'cell',
		className: 'ee-rspnsv-table-column-huge',
		value: '',
	};

	const cells: Array<Cell> = tickets.map((ticket) => ({
		key: ticket.id,
		type: 'cell',
		className: classNames('ee-rspnsv-table-column-huge', getColClass(ticket)),
		value: `${ticket.dbId}: ${ticket.name}`,
	}));

	return [
		{
			cells: [emptyCell, ...cells],
			rowClassName: 'ticket-assignment-manager-table-header-row',
			key: 'ticket-assignment-manager-table-header-row',
			primary: true,
			type: 'row',
		},
	];
};

export default getHeaderRows;
