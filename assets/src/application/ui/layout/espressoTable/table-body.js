/**
 * External imports
 */
import classNames from 'classnames';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import warning from 'warning';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

/**
 * Internal dependencies
 */
import TableRow from './table-row';
import TableHeaderCell from './table-header-cell';
import TableDataCell from './table-data-cell';
import ResponsiveCell from './responsive-cell';

/**
 * @param {string} tableId
 * @param {Array} tableRows
 * @param {Object} cssClasses
 * @param {boolean} hasRowHeaders
 * @param {Object} primaryHeader
 * @param {number} headerRowCount
 * @param {Function} onBeforeDragStart
 * @param {Function} onDragStart
 * @param {Function} onDragUpdate
 * @param {Function} onDragEnd
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableBody = ({
	tableId,
	tableRows,
	cssClasses,
	hasRowHeaders,
	primaryHeader,
	headerRowCount,
	onBeforeDragStart,
	onDragStart,
	onDragUpdate,
	onDragEnd,
	...extraProps
}) => {
	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} column
	 * @param {Object} cellData
	 * @return {Object} rendered headings row
	 */
	const tableCell = (rowNumber, colNumber, column, cellData) => {
		return hasRowHeaders && colNumber === 0 ? (
			<TableHeaderCell
				key={`row-${rowNumber}-col-${colNumber}`}
				rowNumber={rowNumber}
				colNumber={colNumber}
				rowType={'body'}
				htmlId={cellData.id || tableId}
				htmlClass={cellData.class || ''}
				cssClasses={cssClasses}
			>
				{cellData.value || ''}
			</TableHeaderCell>
		) : (
			<TableDataCell
				key={`row-${rowNumber}-col-${colNumber}`}
				rowNumber={rowNumber}
				colNumber={colNumber}
				htmlId={cellData.id || tableId}
				htmlClass={cellData.class || ''}
				cssClasses={cssClasses}
			>
				<ResponsiveCell heading={column.value} value={cellData.value} />
			</TableDataCell>
		);
	};

	const tableBodyRows = tableRows.map((row, rowNumber) => {
		return (
			<TableRow
				rowData={row}
				key={`body-row-${row.key}`}
				rowNumber={rowNumber}
				rowType={'body'}
				htmlId={row.id || tableId}
				htmlClass={row.class || ''}
				cssClasses={cssClasses}
				headerRowCount={headerRowCount}
				sortable={typeof onDragEnd === 'function'}
			>
				{row.cells.map((cellData, colNumber) => {
					const column = primaryHeader.cells[colNumber];
					warning(column !== undefined, `Missing data for column ${colNumber} ` + `in row ${rowNumber}.`);
					warning(
						cellData.hasOwnProperty('value'),
						`Missing "value" property for table cell at ` + `row ${rowNumber} column ${colNumber}.`
					);
					if (isFunction(cellData.render)) {
						return cellData.render(rowNumber, colNumber, column, cellData);
					}
					return tableCell(rowNumber, colNumber, column, cellData);
				})}
			</TableRow>
		);
	});

	const htmlClass = classNames(cssClasses.bodyClass, 'ee-rspnsv-table-body');

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
						className={htmlClass}
						style={{
							...droppableProps.style,
							border: isDraggingOver ? '1px solid lightgreen' : 'none',
							borderSpacing: isDraggingOver ? '2px' : '0',
						}}
						{...droppableProps}
						{...extraProps}
					>
						{tableBodyRows}
						{placeholder}
					</tbody>
				)}
			</Droppable>
		</DragDropContext>
	) : (
		<tbody className={htmlClass} {...extraProps}>
			{tableBodyRows}
		</tbody>
	);
};

TableBody.propTypes = {
	tableId: PropTypes.string.isRequired,
	headerRowCount: PropTypes.number.isRequired,
	tableRows: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			key: PropTypes.string.isRequired,
			id: PropTypes.string,
			class: PropTypes.string,
			extraProps: PropTypes.object,
			cells: PropTypes.arrayOf(
				PropTypes.shape({
					type: PropTypes.string.isRequired,
					key: PropTypes.string.isRequired,
					value: PropTypes.node.isRequired,
					id: PropTypes.string,
					class: PropTypes.string,
					render: PropTypes.func,
					extraProps: PropTypes.object,
				})
			).isRequired,
		})
	).isRequired,
	cssClasses: PropTypes.object,
	hasRowHeaders: PropTypes.bool,
	primaryHeader: PropTypes.object,
	onBeforeDragStart: PropTypes.func,
	onDragStart: PropTypes.func,
	onDragUpdate: PropTypes.func,
	onDragEnd: PropTypes.func,
};

TableBody.defaultProps = {
	cssClasses: {},
	onBeforeDragStart: null,
	onDragStart: null,
	onDragUpdate: null,
	onDragEnd: null,
};

export default TableBody;
