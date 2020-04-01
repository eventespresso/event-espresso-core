import React from 'react';
import classNames from 'classnames';
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
	const tableClassName = classNames('ee-dates-list-list-view');

	const { filterState, filteredEntities } = useDatesListContext();

	return (
		<EntityTable
			entities={filteredEntities}
			filterState={filterState}
			bodyRowGenerator={bodyRowGenerator}
			headerRowGenerator={headerRowGenerator}
			className={tableClassName}
			tableId='date-entities-table-view'
			tableCaption={__('Event Dates')}
		/>
	);
};

export default TableView;
