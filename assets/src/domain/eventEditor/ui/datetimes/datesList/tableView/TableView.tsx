import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { DatesListViewProps } from '../types';
import datesListTableHeader from './datesListTableHeader';
import datesListTableRow from './datesListTableRow';
import { ResponsiveTable } from '@appLayout/espressoTable';

import './styles.scss';

// const noZebraStripe = ['row', 'stripe', 'name', 'actions'];

/**
 * EditorDateEntitiesListView
 * Displays event date details in a standard list table like view
 */
const TableView: React.FC<DatesListViewProps> = ({ className, filterState, entities: datetimes }) => {
	const { displayStartOrEndDate } = filterState;

	const formRows = datetimes.map((datetime) => {
		const columns = datesListTableRow({ datetime, displayStartOrEndDate });
		return columns;
	});

	const headerRows = datesListTableHeader(displayStartOrEndDate);
	const tableClassName = classNames(className, 'ee-dates-list-list-view');

	return (
		<ResponsiveTable
			bodyRows={formRows}
			className={{ tableClassName }}
			headerRows={[headerRows]}
			metaData={{
				tableId: 'date-entities-list-view',
				tableCaption: __('Event Dates'),
			}}
		/>
	);
};

export default TableView;
