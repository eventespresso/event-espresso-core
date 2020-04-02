import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import headerRowGenerator from './headerRowGenerator';
import bodyRowGenerator from './bodyRowGenerator';
import { useDatesListContext } from '@edtrServices/context/EntityListContext';

import './styles.scss';

/**
 * Displays event date details in a standard list table like view
 */
const TableView: React.FC = () => {
	const { filterState, filteredEntities } = useDatesListContext();

	return (
		<EntityTable
			entities={filteredEntities}
			filterState={filterState}
			bodyRowGenerator={bodyRowGenerator}
			headerRowGenerator={headerRowGenerator}
			className={'ee-dates-list-list-view ee-fade-in'}
			tableId='date-entities-table-view'
			tableCaption={__('Event Dates')}
		/>
	);
};

export default TableView;
