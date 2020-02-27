// @ts-nocheck
import React from 'react';
import classNames from 'classnames';
import uuidv4 from 'uuid/v4';
import { find, isEmpty } from 'lodash'; // to be replaced with ramda

/**
 * Internal dependencies
 */
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
	headerRows = [],
	tableRows = [],
	footerRows = [],
	metaData = {},
	classes = {},
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

	const tableClass = classNames(classes.tableClass, `ee-rspnsv-table-column-count-${primaryHeader.cells.length}`, {
		'ee-rspnsv-table-has-row-headers': hasRowHeaders,
	});

	const cssClasses = {
		tableClass,
		headerClass: classes.headerClass || '',
		headerRowClass: classes.headerRowClass || '',
		headerThClass: classes.headerThClass || '',
		bodyClass: classes.bodyClass || '',
		bodyRowClass: classes.bodyRowClass || '',
		bodyThClass: classes.bodyThClass || '',
		bodyTdClass: classes.bodyTdClass || '',
		footerClass: classes.footerClass || '',
		footerRowClass: classes.footerRowClass || '',
		footerThClass: classes.footerThClass || '',
	};

	return (
		<Table tableId={tableId} tableClass={cssClasses.tableClass} captionID={captionID} captionText={tableCaption}>
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

// const cellShape = PropTypes.shape({
// 	type: PropTypes.string.isRequired,
// 	key: PropTypes.string.isRequired,
// 	value: PropTypes.node.isRequired,
// 	id: PropTypes.string,
// 	class: PropTypes.string,
// 	render: PropTypes.func,
// 	extraProps: PropTypes.object,
// });
// const rowShape = PropTypes.shape({
// 	type: PropTypes.string.isRequired,
// 	key: PropTypes.string.isRequired,
// 	id: PropTypes.string,
// 	class: PropTypes.string,
// 	extraProps: PropTypes.object,
// 	cells: PropTypes.arrayOf(cellShape).isRequired,
// });
// ResponsiveTable.propTypes = {
// 	instanceId: PropTypes.number.isRequired,
// 	headerRows: PropTypes.arrayOf(rowShape).isRequired,
// 	tableRows: PropTypes.arrayOf(rowShape).isRequired,
// 	footerRows: PropTypes.arrayOf(rowShape),
// 	metaData: PropTypes.shape({
// 		tableCaption: PropTypes.string.isRequired,
// 		tableId: PropTypes.string,
// 		hasRowHeaders: PropTypes.bool,
// 	}).isRequired,
// 	classes: PropTypes.shape({
// 		tableClass: PropTypes.string,
// 		headerClass: PropTypes.string,
// 		headerRowClass: PropTypes.string,
// 		headerThClass: PropTypes.string,
// 		bodyClass: PropTypes.string,
// 		bodyRowClass: PropTypes.string,
// 		bodyThClass: PropTypes.string,
// 		bodyTdClass: PropTypes.string,
// 		footerClass: PropTypes.string,
// 		footerRowClass: PropTypes.string,
// 		footerThClass: PropTypes.string,
// 	}),
// };

export default ResponsiveTable;
