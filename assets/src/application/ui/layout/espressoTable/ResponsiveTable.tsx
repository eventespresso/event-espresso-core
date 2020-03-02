import React from 'react';
import classNames from 'classnames';
import uuidv4 from 'uuid/v4';
import { find, isEmpty } from 'lodash'; // to be replaced with ramda

import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import './style.scss';

/**
 * ResponsiveDataGrid responsive-table
 * produces a table like structure for displaying tabular data
 * in a grid that collapses properly on smaller screens
 *
 */
const ResponsiveTable = ({
	className = {},
	headerRows = [],
	tableRows = [],
	footerRows = [],
	metaData = {},
	onBeforeDragStart,
	onDragStart,
	onDragUpdate,
	onDragEnd,
	...props
}: any) => {
	const primaryHeader = find(headerRows, 'primary');
	const instanceId = props.instanceId || uuidv4();
	if (!primaryHeader || isEmpty(tableRows)) {
		return null;
	}
	const tableId = metaData.tableId || `ee-rspnsv-table-${instanceId}`;
	const tableCaption = metaData.tableCaption || '';
	const captionID = `${tableId}-caption`;
	const hasRowHeaders = !!metaData.hasRowHeaders;
	const headerRowCount = headerRows.length;
	const tableRowCount = tableRows.length;

	const tableClassName = classNames(
		className.tableClassName,
		`ee-rspnsv-table-column-count-${primaryHeader.cells.length}`,
		{
			'ee-rspnsv-table-has-row-headers': hasRowHeaders,
		}
	);

	const cssClasses = {
		headerClass: className.headerClass || '',
		headerRowClass: className.headerRowClass || '',
		headerThClass: className.headerThClass || '',
		bodyClass: className.bodyClass || '',
		bodyRowClass: className.bodyRowClass || '',
		bodyThClass: className.bodyThClass || '',
		bodyTdClass: className.bodyTdClass || '',
		footerClass: className.footerClass || '',
		footerRowClass: className.footerRowClass || '',
		footerThClass: className.footerThClass || '',
		tableClassName,
	};

	return (
		<Table
			tableId={tableId}
			tableClassName={cssClasses.tableClassName}
			captionID={captionID}
			captionText={tableCaption}
		>
			<TableHeader tableId={tableId} headerRows={headerRows} cssClasses={cssClasses} />
			<TableBody
				tableId={tableId}
				tableRows={tableRows}
				hasRowHeaders={hasRowHeaders}
				primaryHeader={primaryHeader}
				headerRowCount={headerRowCount}
				cssClasses={cssClasses}
				onBeforeDragStart={onBeforeDragStart}
				onDragStart={onDragStart}
				onDragUpdate={onDragUpdate}
				onDragEnd={onDragEnd}
			/>
			<TableFooter
				tableId={tableId}
				footerRows={footerRows}
				cssClasses={cssClasses}
				rowCount={headerRowCount + tableRowCount}
			/>
		</Table>
	);
};

export default ResponsiveTable;
