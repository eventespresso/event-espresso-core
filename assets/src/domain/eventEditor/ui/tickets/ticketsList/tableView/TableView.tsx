import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { ResponsiveTable } from '@appLayout/espressoTable';
import ticketsListTableHeader from './ticketsListTableHeader';
import ticketsListTableRow from './ticketsListTableRow';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';

import { TableViewProps } from './types';

import './styles.scss';

const noZebraStripe = ['row', 'stripe', 'name', 'actions'];

/**
 * EditorTicketsListView
 * Displays tickets in a standard list table like view
 */
const TableView: React.FC<TableViewProps> = ({ className, displayDates, entities: tickets, showDate, ...props }) => {
	const formRows = tickets.map(({ id }) => {
		const ticket = useTicketItem({ id });
		const columns = ticketsListTableRow({ displayDates, ticket, ...props });
		return columns;
	});

	const headerRows = ticketsListTableHeader(displayDates);
	const tableClassName = classNames(className, 'ee-tickets-list-list-view');

	return (
		<ResponsiveTable
			className={{ tableClassName }}
			headerRows={[headerRows]}
			metaData={{
				tableId: 'date-entities-list-view',
				tableCaption: __('Event Dates', 'event_espresso'),
			}}
			tableRows={formRows}
		/>
	);
};

export default TableView;
