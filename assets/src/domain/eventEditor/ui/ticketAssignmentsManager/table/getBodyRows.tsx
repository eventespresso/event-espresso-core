import React from 'react';
import classNames from 'classnames';

import { Cell } from '@appLayout/espressoTable';
import BodyCell from './BodyCell';
import useTAMState from '../useTAMState';
import { DatesAndTickets } from '../types';
import useRowClassName from './useRowClassName';
import useColClassName from './useColClassName';

const getBodyRows = ({ datetimes, tickets }: DatesAndTickets) => {
	const { getAssignmentStatus } = useTAMState();

	const getRowClass = useRowClassName();
	const getColClass = useColClassName();

	const formRows = datetimes.map((datetime) => {
		const datetimeCell: Cell = {
			key: 'datetime',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-rspnsv-table-column-micro',
			value: `${datetime.dbId}: ${datetime.name}`,
		};

		const cells: Array<Cell> = tickets.map((ticket) => {
			const status = getAssignmentStatus({ datetimeId: datetime.id, ticketId: ticket.id });

			const className = classNames(
				status && `${status.toLowerCase()}-assignment`,
				'ee-date-list-col-hdr ee-rspnsv-table-column-huge text-center',
				getColClass(ticket)
			);

			return {
				key: ticket.id,
				type: 'cell',
				className,
				value: <BodyCell datetime={datetime} ticket={ticket} />,
			};
		});

		return {
			cells: [datetimeCell, ...cells],
			className: 'ticket-assignment-manager-table-body-row',
			rowClassName: getRowClass(datetime),
			key: datetime.id,
			primary: true,
			type: 'row',
		};
	});

	return formRows;
};

export default getBodyRows;
