import React from 'react';

const TableHeaderCell = ({
	children,
	className,
	colNumber,
	htmlId = '',
	htmlClassName = '',
	rowNumber,
	rowType,
	...extraProps
}) => {
	const id = htmlId
		? `${htmlId}-${rowType}-row-${rowNumber}-col-${colNumber}`
		: `ee-rspnsv-table-${rowType}-row-${rowNumber}-col-${colNumber}`;
	let classes = htmlClassName
		? `${htmlClassName} ee-rspnsv-table-${rowType}-th ee-col-${colNumber}`
		: `ee-rspnsv-table-${rowType}-th ee-col-${colNumber}`;
	const rowTypeClass = rowType + 'ThClass';

	classes = className[rowTypeClass] ? `${classes} ${className[rowTypeClass]}` : classes;

	if (rowType === 'header') {
		extraProps.role = 'columnheader';
		extraProps.scope = 'col';
	} else if (rowType === 'body') {
		extraProps.scope = 'row';
	}

	return (
		<th id={id} className={classes}>
			{children}
		</th>
	);
};

export default TableHeaderCell;
