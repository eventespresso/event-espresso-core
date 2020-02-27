import React from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

/**
 * @param {Object} rowData
 * @param {Array} children
 * @param {number} rowNumber
 * @param {number} headerRowCount
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} cssClasses
 * @param {string} rowType
 * @param {boolean} sortable
 * @param {Object} extraProps
 * @return {Object} rendered tr
 */
const TableRow = ({
	rowData,
	children,
	rowNumber,
	headerRowCount,
	htmlId,
	htmlClass,
	cssClasses,
	rowType,
	sortable,
	...extraProps
}) => {
	if (!rowData) {
		return null;
	}
	const id = htmlId ? `${htmlId}-row-${rowNumber}` : `ee-rspnsv-table-row-${rowNumber}`;
	const css = classNames(
		htmlClass,
		`ee-rspnsv-table-${rowType}-row`,
		`ee-row-${rowNumber}`,
		cssClasses[`${rowType}RowClass`]
	);
	return sortable ? (
		<Draggable key={rowData.key} draggableId={rowData.key} index={rowNumber}>
			{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
				// incrementing row number here
				// because the Draggable needs
				// indexes to start at 0
				rowNumber += headerRowCount;
				return (
					<tr
						ref={innerRef}
						id={id}
						className={css}
						style={{
							...draggableProps.style,
							border: isDragging ? '1px solid var(--ee-color-bright-blue)' : 'none',
							display: isDragging ? 'table' : 'table-row',
						}}
						{...draggableProps}
						{...dragHandleProps}
						{...extraProps}
					>
						{children}
					</tr>
				);
			}}
		</Draggable>
	) : (
		<tr id={id} className={css} {...extraProps}>
			{children}
		</tr>
	);
};

export default TableRow;
