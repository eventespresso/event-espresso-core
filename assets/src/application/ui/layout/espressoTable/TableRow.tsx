import React from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import { TableRowProps } from './types';

const TableRow: React.FC<TableRowProps> = ({
	children,
	rowData,
	rowNumber,
	headerRowCount,
	htmlId = '',
	rowClassName = '',
	className,
	rowType = 'body',
	sortable = false,
}) => {
	if (!rowData) {
		return null;
	}
	const id = htmlId ? `${htmlId}-row-${rowNumber}` : `ee-rspnsv-table-row-${rowNumber}`;
	const css = classNames(
		rowClassName,
		`ee-rspnsv-table-${rowType}-row`,
		`ee-row-${rowNumber}`,
		className[`${rowType}RowClass`]
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
					>
						{children}
					</tr>
				);
			}}
		</Draggable>
	) : (
		<tr id={id} className={css}>
			{children}
		</tr>
	);
};

export default TableRow;
