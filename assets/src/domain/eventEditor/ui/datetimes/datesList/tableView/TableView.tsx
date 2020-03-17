import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import { DatesListViewProps } from '../types';
import headerRowGenerator from './headerRowGenerator';
import bodyRowGenerator from './bodyRowGenerator';

import './styles.scss';

/**
 * Displays event date details in a standard list table like view
 */
const TableView: React.FC<DatesListViewProps> = ({ className, filterState, entities }) => {
	const tableClassName = classNames(className, 'ee-dates-list-list-view');

	return (
		<EntityTable
			entities={entities}
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
