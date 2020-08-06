import React from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { isFunc } from '@appServices/utilities/function';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import TableDataCell from './TableDataCell';
import ResponsiveCell from './ResponsiveCell';

import { RowType, TableBodyProps } from './types';

const TableBody: React.FC<TableBodyProps> = ({
	bodyRows,
	headerRowCount,
	hasRowHeaders,
	onBeforeDragStart,
	onDragEnd,
	onDragStart,
	onDragUpdate,
	primaryHeader,
	showDragHandle,
	tableId,
	...props
}) => {
	const tableCell = (rowNumber, colNumber, column, cellData) => {
		return hasRowHeaders && colNumber === 0 ? (
			<TableHeaderCell
				className={props.className}
				key={`row-${rowNumber}-col-${colNumber}`}
				rowNumber={rowNumber}
				colNumber={colNumber}
				rowType={RowType.body}
				id={cellData.id || `${tableId}-header-cell`}
				tableHeaderCellClassName={cellData.className}
			>
				{cellData.value || ''}
			</TableHeaderCell>
		) : (
			<TableDataCell
				className={props.className}
				colNumber={colNumber}
				id={cellData.id || `${tableId}-data-cell`}
				key={`row-${rowNumber}-col-${colNumber}`}
				rowNumber={rowNumber}
				tableDataCellClassName={cellData.className || ''}
			>
				<ResponsiveCell heading={column.value} value={cellData.value} />
			</TableDataCell>
		);
	};

	const tableBodyRows = bodyRows.map((row, rowNumber) => {
		const sortable = isFunc(onDragEnd);

		return (
			<TableRow
				className={props.className}
				headerRowCount={headerRowCount}
				id={row.id || `${tableId}-row`}
				key={`body-row-${row.key}`}
				rowData={row}
				rowClassName={row.rowClassName}
				rowNumber={rowNumber}
				rowType={RowType.body}
				showDragHandle={showDragHandle}
				sortable={sortable}
			>
				{row.cells.map((cellData, colNumber) => {
					const column = primaryHeader.cells[colNumber];
					warning(column !== undefined, `Missing data for column ${colNumber} ` + `in row ${rowNumber}.`);
					warning(
						cellData.hasOwnProperty('value'),
						`Missing "value" property for table cell at ` + `row ${rowNumber} column ${colNumber}.`
					);

					if (cellData.render) {
						return cellData.render({ row: rowNumber, col: colNumber, column, cellData });
					}

					return tableCell(rowNumber, colNumber, column, cellData);
				})}
			</TableRow>
		);
	});

	const className = classNames(props?.className?.bodyClassName, 'ee-rspnsv-table-body');

	const tableBodyProps: React.HTMLAttributes<HTMLElement> = {
		...props,
		className,
	};

	return onDragEnd !== null ? (
		<DragDropContext
			onBeforeDragStart={onBeforeDragStart}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onDragEnd={onDragEnd}
		>
			<Droppable droppableId={`${tableId}-droppable`}>
				{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => {
					const style = {
						border: isDraggingOver ? '1px solid lightgreen' : 'none',
						borderSpacing: isDraggingOver ? '2px' : '0',
					};

					return (
						<tbody ref={innerRef} style={style} {...droppableProps} {...tableBodyProps}>
							{tableBodyRows}
							{placeholder}
						</tbody>
					);
				}}
			</Droppable>
		</DragDropContext>
	) : (
		<tbody {...tableBodyProps}>{tableBodyRows}</tbody>
	);
};

export default TableBody;
