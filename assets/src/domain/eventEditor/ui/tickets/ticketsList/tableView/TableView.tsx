import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import headerRowGenerator from './headerRowGenerator';
import bodyRowGenerator from './bodyRowGenerator';
import { useTicketsListContext } from '@edtrServices/context/EntityListContext';

/**
 * Displays tickets in a standard list table like view
 */
const TableView: React.FC = () => {
	const { filterState, filteredEntities } = useTicketsListContext();

	return (
		<EntityTable
			entities={filteredEntities}
			filterState={filterState}
			bodyRowGenerator={bodyRowGenerator}
			headerRowGenerator={headerRowGenerator}
			className={'ee-tickets-list-list-view ee-fade-in'}
			tableId='ticket-entities-table-view'
			tableCaption={__('Tickets')}
		/>
	);
};

export default TableView;
