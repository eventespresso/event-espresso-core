import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import headerRowGenerator from './headerRowGenerator';
import bodyRowGenerator from './bodyRowGenerator';
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
			bodyRowGenerator={bodyRowGenerator}
			headerRowGenerator={headerRowGenerator}
			className={tableClassName}
			tableId='ticket-entities-table-view'
			tableCaption={__('Tickets')}
		/>
	);
};

export default TableView;
