import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { ResponsiveTable } from '@appLayout/espressoTable';

import datesListTableHeader from './datesListTableHeader';
import datesListTableRow from './datesListTableRow';
import './editor-date-entities-list-view.css';

const noZebraStripe = ['row', 'stripe', 'name', 'actions'];

/**
 * EditorDateEntitiesListView
 * Displays event date details in a standard list table like view
 *
 * @function
 * @param {Object} props
 * @member {Array} entities         filtered array of Event Date model objects
 * @member {Array} allEventDates    array of ALL Event Date model objects
 * @member {string} showDate
 * @member {string} htmlClass
 * @member {Object} otherProps
 * @return {Object} rendered table of Event Dates
 */
const TableView = ({
	className,
	entities: datetimes,
	allEventDates,
	showDate,
	setEntityIds,
	setSortBy,
	...otherProps
}) => {
	const formRows = datetimes.map((dateEntity) => {
		const columns = datesListTableRow(dateEntity, otherProps);
		return columns;
	});

	const tableClassName = classNames(className, 'ee-dates-list-list-view');

	return (
		<ResponsiveTable
			headerRows={[datesListTableHeader()]}
			tableRows={formRows}
			metaData={{
				tableId: 'date-entities-list-view',
				tableCaption: __('Event Dates', 'event_espresso'),
			}}
			className={{ tableClassName }}
		/>
	);
};

export default TableView;
