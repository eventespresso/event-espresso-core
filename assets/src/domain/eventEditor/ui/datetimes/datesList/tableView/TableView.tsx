import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import useHeaderRowGenerator from './useHeaderRowGenerator';
import useBodyRowGenerator from './useBodyRowGenerator';
import { useDatesListContext } from '@edtrServices/context/EntityListContext';
import { useReorderDatetimes } from '@edtrServices/apollo/mutations';

import './styles.scss';

/**
 * Displays event date details in a standard list table like view
 */
const TableView: React.FC = () => {
	const { filterState, filteredEntities } = useDatesListContext();

	const { sortResponder: sortDates } = useReorderDatetimes(filteredEntities);

	const bodyRowGenerator = useBodyRowGenerator();
	const headerRowGenerator = useHeaderRowGenerator();

	return (
		<EntityTable
			entities={filteredEntities}
			filterState={filterState}
			bodyRowGenerator={bodyRowGenerator}
			headerRowGenerator={headerRowGenerator}
			className={'ee-dates-list-list-view ee-fade-in'}
			tableId='date-entities-table-view'
			tableCaption={__('Event Dates')}
			onSort={sortDates}
		/>
	);
};

export default TableView;
