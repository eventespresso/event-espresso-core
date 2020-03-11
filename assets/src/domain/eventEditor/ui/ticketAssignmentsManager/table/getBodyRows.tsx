import React from 'react';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

import { Cell } from '@appLayout/espressoTable';
import { Datetime, Ticket } from '@edtrServices/apollo/types';

import BodyCell from './BodyCell';
import useTAMState from '../useTAMState';

type Props = {
	datetimes: Datetime[];
	tickets: Ticket[];
};

const getBodyRows = ({ datetimes, tickets }: Props) => {
	const { getAssignmentStatus } = useTAMState();

	const formRows = datetimes.map((datetime) => {
		const datetimeCell: Cell = {
			key: 'datetime',
			type: 'cell',
			className: 'ee-date-list-col-hdr ee-rspnsv-table-column-micro',
			value: datetime.name,
		};

		const cells: Array<Cell> = tickets.map((ticket) => {
			const status = getAssignmentStatus({ datetimeId: datetime.id, ticketId: ticket.id });

			const className = classNames(
				status && `${status.toLowerCase()}-assignment`,
				'ee-date-list-col-hdr ee-rspnsv-table-column-huge text-center'
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
			key: 'ticket-assignment-manager-table-body-row',
			primary: true,
			type: 'row',
		};
	});

	return formRows;
};

export default getBodyRows;
