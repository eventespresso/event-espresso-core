import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { isEmpty } from '@appServices/utilities/array';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import './style.scss';

import { ResponsiveTableProps } from './types';

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
	bodyRows = [],
	className = {},
	footerRows = [],
	headerRows = [],
	metaData = {},
	onBeforeDragStart,
	onDragEnd,
	onDragStart,
	onDragUpdate,
	...props
}) => {
	const primaryHeader = headerRows.find((row) => row.primary === true);
	const instanceId = props.instanceId || uuidv4();
	if (!primaryHeader || isEmpty(bodyRows)) {
		return null;
	}
	const tableId = metaData.tableId || `ee-rspnsv-table-${instanceId}`;
	const tableCaption = metaData.tableCaption;
	const captionID = `${tableId}-caption`;
	const hasRowHeaders = !!metaData.hasRowHeaders;
	const headerRowCount = headerRows.length;
	const tableRowCount = bodyRows.length;

	const tableClassName = classNames(
		className.tableClassName,
		`ee-rspnsv-table-column-count-${primaryHeader.cells.length}`,
		{
			'ee-rspnsv-table-has-row-headers': hasRowHeaders,
		}
	);

	const cssClasses = {
		headerClassName: className.headerClassName || '',
		headerRowClassName: className.headerRowClassName || '',
		headerThClassName: className.headerThClassName || '',
		bodyClassName: className.bodyClassName || '',
		bodyRowClassName: className.bodyRowClassName || '',
		bodyThClassName: className.bodyThClassName || '',
		bodyTdClassName: className.bodyTdClassName || '',
		footerClassName: className.footerClassName || '',
		footerRowClassName: className.footerRowClassName || '',
		footerThClassName: className.footerThClassName || '',
		tableClassName,
	};

	return (
		<Table captionID={captionID} captionText={tableCaption} className={cssClasses.tableClassName} tableId={tableId}>
			<TableHeader className={cssClasses} headerRows={headerRows} tableId={tableId} />
			<TableBody
				bodyRows={bodyRows}
				className={cssClasses}
				hasRowHeaders={hasRowHeaders}
				headerRowCount={headerRowCount}
				onBeforeDragStart={onBeforeDragStart}
				onDragStart={onDragStart}
				onDragUpdate={onDragUpdate}
				onDragEnd={onDragEnd}
				primaryHeader={primaryHeader}
				tableId={tableId}
			/>
			<TableFooter
				className={cssClasses}
				footerRows={footerRows}
				tableId={tableId}
				rowCount={headerRowCount + tableRowCount}
			/>
		</Table>
	);
};

export default ResponsiveTable;
