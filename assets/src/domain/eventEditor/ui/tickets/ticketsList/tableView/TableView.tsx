import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import ticketsListTableHeader from './ticketsListTableHeader';
import ticketsListTableRow from './ticketsListTableRow';
import { TicketsListViewProps } from '../types';

/**
 * Displays tickets in a standard list table like view
 */
const TableView: React.FC<TicketsListViewProps> = ({ className, filterState, entities }) => {
	const tableClassName = classNames(className, 'ee-tickets-list-list-view');

	return (
		<EntityTable
			entities={entities}
			filterState={filterState}
			bodyRowGenerator={ticketsListTableRow}
			headerRowGenerator={ticketsListTableHeader}
			className={tableClassName}
			tableId='ticket-entities-table-view'
			tableCaption={__('Tickets')}
		/>
	);
};

export default TableView;
