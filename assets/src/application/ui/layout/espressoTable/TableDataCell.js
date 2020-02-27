import React from 'react';
import classNames from 'classnames';

/**
 * @param {mixed} children
 * @param {number} rowNumber
 * @param {number} colNumber
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} cssClasses
 * @param {Object} extraProps
 * @return {Object} rendered <th> heading cell
 */
const TableDataCell = ({ children, rowNumber, colNumber, htmlId, htmlClass, cssClasses, ...extraProps }) => {
	const id = htmlId
		? `${htmlId}-row-${rowNumber}-col-${colNumber}`
		: `ee-rspnsv-table-row-${rowNumber}-col-${colNumber}`;
	const classes = classNames(htmlClass, 'ee-rspnsv-table-body-td', `ee-col-${colNumber}`, cssClasses.bodyTdClass);
	return (
		<td id={id} className={classes} {...extraProps}>
			{children}
		</td>
	);
};

export default TableDataCell;
