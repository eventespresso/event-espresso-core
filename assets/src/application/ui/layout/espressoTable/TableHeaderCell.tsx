import React from 'react';

/**
 * @param {mixed} children
 * @param {number} rowNumber
 * @param {number} colNumber
 * @param {string} rowType
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} className
 * @param {Object} extraProps
 * @return {Object} rendered <th> heading cell
 */
const TableHeaderCell = ({ children, rowNumber, colNumber, rowType, htmlId, htmlClass, className, ...extraProps }) => {
	const id = htmlId
		? `${htmlId}-${rowType}-row-${rowNumber}-col-${colNumber}`
		: `ee-rspnsv-table-${rowType}-row-${rowNumber}-col-${colNumber}`;
	let classes = htmlClass
		? `${htmlClass} ee-rspnsv-table-${rowType}-th ee-col-${colNumber}`
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
