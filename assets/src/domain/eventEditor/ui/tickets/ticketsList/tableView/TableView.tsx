import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import useHeaderRowGenerator from './useHeaderRowGenerator';
import useBodyRowGenerator from './useBodyRowGenerator';
import { useTicketsListContext } from '@edtrServices/context/EntityListContext';

/**
 * Displays tickets in a standard list table like view
 */
const TableView: React.FC = () => {
	const { filterState, filteredEntities } = useTicketsListContext();

	const bodyRowGenerator = useBodyRowGenerator();
	const headerRowGenerator = useHeaderRowGenerator();

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
