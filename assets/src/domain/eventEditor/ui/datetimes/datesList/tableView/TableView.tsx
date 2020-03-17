import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EntityTable } from '@appLayout/entityList';
import { DatesListViewProps } from '../types';
import datesListTableHeader from './datesListTableHeader';
import datesListTableRow from './datesListTableRow';

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
			bodyRowGenerator={datesListTableRow}
			headerRowGenerator={datesListTableHeader}
			className={tableClassName}
			tableId='date-entities-list-view'
			tableCaption={__('Event Dates')}
		/>
	);
};

export default TableView;
