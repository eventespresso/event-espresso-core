import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import datesListTableHeader from './datesListTableHeader';
import datesListTableRow from './datesListTableRow';
import { ResponsiveTable } from '@appLayout/espressoTable';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';

import { TableViewProps } from './types';

import './styles.scss';

const noZebraStripe = ['row', 'stripe', 'name', 'actions'];

/**
 * EditorDateEntitiesListView
 * Displays event date details in a standard list table like view
 */
const TableView: React.FC<TableViewProps> = ({ className, displayDates, entities: datetimes, showDate, ...props }) => {
	const formRows = datetimes.map(({ id }) => {
		const datetime = useDatetimeItem({ id });
		const columns = datesListTableRow({ datetime, displayDates, ...props });
		return columns;
	});

	const headerRows = datesListTableHeader(displayDates);
	const tableClassName = classNames(className, 'ee-dates-list-list-view');

	return (
		<ResponsiveTable
			className={{ tableClassName }}
			headerRows={[headerRows]}
			metaData={{
				tableId: 'date-entities-list-view',
				tableCaption: __('Event Dates', 'event_espresso'),
			}}
			tableRows={formRows}
		/>
	);
};

export default TableView;
