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
	headerRowCount,
	hasRowHeaders,
	onBeforeDragStart,
	onDragEnd,
	onDragStart,
	onDragUpdate,
	primaryHeader,
	tableId,
	tableRows,
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
				id={cellData.id || tableId}
				htmlClass={cellData.class || ''}
			>
				{cellData.value || ''}
			</TableHeaderCell>
		) : (
			<TableDataCell
				className={props.className}
				colNumber={colNumber}
				key={`row-${rowNumber}-col-${colNumber}`}
				rowNumber={rowNumber}
				htmlId={cellData.id || tableId}
				htmlClass={cellData.class || ''}
			>
				<ResponsiveCell heading={column.value} value={cellData.value} />
			</TableDataCell>
		);
	};

	const tableBodyRows = tableRows.map((row, rowNumber) => {
		const sortable = isFunc(onDragEnd);

		return (
			<TableRow
				rowData={row}
				key={`body-row-${row.key}`}
				rowNumber={rowNumber}
				rowType={RowType.body}
				htmlId={row.id || tableId}
				rowClassName={row.className}
				className={props.className}
				headerRowCount={headerRowCount}
				sortable={sortable}
			>
				{row.cells.map((cellData, colNumber) => {
					const column = primaryHeader.cells[colNumber];
					warning(column !== undefined, `Missing data for column ${colNumber} ` + `in row ${rowNumber}.`);
					warning(
						cellData.hasOwnProperty('value'),
						`Missing "value" property for table cell at ` + `row ${rowNumber} column ${colNumber}.`
					);

					if (isFunc(cellData.render)) {
						return cellData.render({ row: rowNumber, col: colNumber, column, cellData });
					}

					return tableCell(rowNumber, colNumber, column, cellData);
				})}
			</TableRow>
		);
	});

	const className = classNames(props?.className?.bodyClassName, 'ee-rspnsv-table-body');

	return onDragEnd !== null ? (
		<DragDropContext
			onBeforeDragStart={onBeforeDragStart}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onDragEnd={onDragEnd}
		>
			<Droppable droppableId={`${tableId}-droppable`}>
				{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
					<tbody
						ref={innerRef}
						className={className}
						style={{
							border: isDraggingOver ? '1px solid lightgreen' : 'none',
							borderSpacing: isDraggingOver ? '2px' : '0',
						}}
						{...droppableProps}
					>
						{tableBodyRows}
						{placeholder}
					</tbody>
				)}
			</Droppable>
		</DragDropContext>
	) : (
		<tbody className={className}>{tableBodyRows}</tbody>
	);
};

export default TableBody;
