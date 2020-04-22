import React from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from '@chakra-ui/core';

import { RowType, BodyRow } from './types';

const TableRow: React.FC<BodyRow> = ({
	children,
	rowData,
	rowNumber,
	headerRowCount,
	rowClassName = '',
	className,
	rowType = RowType.body,
	showDragHandle,
	sortable = false,
	...props
}) => {
	if (!rowData) {
		return null;
	}
	const id = props.id ? `${props.id}-row-${rowNumber}` : `ee-rspnsv-table-row-${rowNumber}`;
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
						{...(!showDragHandle && dragHandleProps)}
					>
						{children}
						{showDragHandle && (
							<td {...dragHandleProps}>
								<Icon name='drag-handle' />
							</td>
						)}
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
