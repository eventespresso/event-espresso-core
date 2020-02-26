import React from 'react';

/**
 * @param {mixed} children
 * @param {number} rowNumber
 * @param {number} colNumber
 * @param {string} rowType
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} cssClasses
 * @param {Object} extraProps
 * @return {Object} rendered <th> heading cell
 */
const TableHeaderCell = ({ children, rowNumber, colNumber, rowType, htmlId, htmlClass, cssClasses, ...extraProps }) => {
	const id = htmlId
		? `${htmlId}-${rowType}-row-${rowNumber}-col-${colNumber}`
		: `ee-rspnsv-table-${rowType}-row-${rowNumber}-col-${colNumber}`;
	let classes = htmlClass
		? `${htmlClass} ee-rspnsv-table-${rowType}-th ee-col-${colNumber}`
		: `ee-rspnsv-table-${rowType}-th ee-col-${colNumber}`;
	const rowTypeClass = rowType + 'ThClass';
	classes = cssClasses[rowTypeClass] ? `${classes} ${cssClasses[rowTypeClass]}` : classes;
	if (rowType === 'header') {
		extraProps.role = 'columnheader';
		extraProps.scope = 'col';
	} else if (rowType === 'body') {
		extraProps.scope = 'row';
	}
	return (
		<th id={id} className={classes} {...extraProps}>
			{children}
		</th>
	);
};

export default TableHeaderCell;
