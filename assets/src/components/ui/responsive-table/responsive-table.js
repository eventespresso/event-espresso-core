/**
 * External imports
 */
import warning from 'warning';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty, isFunction } from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Table from './table';
import TableHeader from './table-header';
import TableBody from './table-body';
import TableFooter from './table-footer';
import TableRow from './table-row';
import TableHeadingCell from './table-heading-cell';
import TableDataCell from './table-data-cell';
import ResponsiveCell from './responsive-cell';
import './style.css';

const nullFunc = () => {};

/**
 * ResponsiveDataGrid responsive-table
 * produces a table like structure for displaying tabular data
 * in a grid that collapses properly on smaller screens
 *
 * @param {Object} props
 * @var {string} instanceId
 * @var {Array} columns
 * @var {Array} rowData
 * @var {Array} footerData
 * @var {Object} metaData
 * @var {Object} classes
 * @var {Function} onBeforeDragStart
 * @var {Function} onDragStart
 * @var {Function} onDragUpdate
 * @var {Function} onDragEnd
 */
const ResponsiveTable = ( {
	instanceId,
	columns = [],
	rowData = [],
	footerData = [],
	metaData = {},
	classes = {},
	onBeforeDragStart = nullFunc,
	onDragStart = nullFunc,
	onDragUpdate = nullFunc,
	onDragEnd = nullFunc,
} ) => {

	if ( isEmpty( columns ) ) {
		return null;
	}
	const tableId = metaData.tableId || `ee-rspnsv-table-${ instanceId }`;
	const tableCaption = metaData.tableCaption || '';
	const captionID = `${ tableId }-caption`;
	const showTableFooter = typeof metaData.showTableFooter === 'undefined' ?
		true : metaData.showTableFooter;
	const hasRowHeaders = !! metaData.hasRowHeaders;

	const tableColumns = [];
	let rowNumber = -1;

	/**
	 * @function
	 * @param {Object} classes
	 */
	const cssClasses = {
		tableClass: classNames(
			classes.tableClass,
			{ 'ee-rspnsv-table-has-row-headers': hasRowHeaders }
		),
		headerClass: classes.headerClass || '',
		headerRowClass: classes.headerRowClass || '',
		headerThClass: classes.headerThClass || '',
		bodyClass: classes.bodyClass || '',
		bodyRowClass: classes.bodyRowClass || '',
		bodyThClass: classes.bodyThClass || '',
		bodyTdClass: classes.bodyTdClass || '',
		footerClass: classes.footerClass || '',
		footerRowClass: classes.footerRowClass || '',
		footerThClass: classes.footerThClass || '',
	};

	/**
	 * @function
	 * @param {Array} columns
	 * @param {boolean} isFooter
	 * @return {Object} rendered headings row
	 */
	const getTableHeader = ( columns, isFooter = false ) => {
		rowNumber++;
		const rowType = isFooter === true ? 'footer' : 'header';
		let rowProps = {};
		let indexMod = 0;
		const headerCells = columns.map(
			( column, colNumber ) => {
				column.rowType = column.rowType || rowType;
				if ( column.type && column.type === 'row' ) {
					rowProps = column;
					indexMod++;
					return null;
				}
				tableColumns.push( column );
				colNumber -= indexMod;
				const hasRenderCallback = isFunction( column.render );
				warning(
					hasRenderCallback || column.hasOwnProperty( 'value' ),
					`Missing "value" property for ${ rowType } column ${ colNumber }.`
				);
				const renderCallback = hasRenderCallback ?
					column.render :
					headingCell;
				return renderCallback( rowNumber, colNumber, column );
			}
		);
		return tableRow( headerCells, rowProps );
	};

	/**
	 * @function
	 * @param {Array} cells
	 * @param {Object} rowProps
	 * @param {Object} provided
	 * @param {Object} snapshot
	 * @return {Object} rendered <tr> element
	 */
	const tableRow = ( cells, rowProps = {}, provided = {}, snapshot = {} ) => {
		const draggableProps = provided.draggableProps || {};
		const dragHandleProps = provided.dragHandleProps || {};
		return (
			<TableRow
				innerRef={ provided.innerRef }
				key={ `row-${ rowNumber }` }
				rowNumber={ rowNumber }
				rowType={ rowProps.rowType || 'body' }
				htmlId={ rowProps.id || tableId }
				htmlClass={ rowProps.class || '' }
				classes={ cssClasses }
				{ ...draggableProps }
				{ ...dragHandleProps }
				style={ getRowStyle(
					snapshot.isDragging,
					draggableProps.style || {}
				) }
			>
				{ cells }
			</TableRow>
		);
	};

	/**
	 * @function
	 * @param {boolean} isDragging
	 * @param {Object} style
	 * @return {Object} css styles
	 */
	const getRowStyle = ( isDragging = false, style = {} ) => {
		style.border = isDragging ?
			'1px solid var(--ee-color-bright-blue)' :
			'none';
		style.display = isDragging ?
			'table' :
			'table-row';
		return style
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} cellProps
	 * @return {Object} rendered column header cell
	 */
	const headingCell = ( rowNumber, colNumber, cellProps ) => {
		return (
			<TableHeadingCell
				key={ `row-${ rowNumber }-col-${ colNumber }` }
				rowNumber={ rowNumber }
				colNumber={ colNumber }
				rowType={ cellProps.rowType || 'body' }
				htmlId={ cellProps.id || tableId }
				htmlClass={ cellProps.class || '' }
				classes={ cssClasses }
			>
				{ cellProps.value || '' }
			</TableHeadingCell>
		);
	};

	/**
	 * @function
	 * @param {Array} dataRow
	 * @param {Object} provided
	 * @param {Object} snapshot
	 * @return {Object} rendered data row
	 */
	const renderDataRow = ( dataRow, provided, snapshot ) => {
		rowNumber++;
		warning(
			Array.isArray( dataRow ),
			`Data for row ${ rowNumber } is not an array.`
		);
		let rowProps = {};
		let indexMod = 0;
		const rowCells = dataRow.map(
			( cellData, colNumber ) => {
				cellData.rowType = cellData.rowType || 'body';
				if ( cellData.type && cellData.type === 'row' ) {
					rowProps = cellData;
					indexMod++;
					return null;
				}
				// adjust column number used in IDs
				// before grabbing element from column data
				colNumber -= indexMod;
				const column = tableColumns[ colNumber ];
				if ( ! column ) {
					warning(
						false,
						`Missing data for column ${ colNumber } ` +
						`in row ${ rowNumber }.`
					);
					return null;
				}
				const hasRenderCallback = isFunction( cellData.render );
				warning(
					hasRenderCallback || cellData.hasOwnProperty( 'value' ),
					`Missing "value" property for table cell at ` +
					`row ${ rowNumber } column ${ colNumber }.`
				);
				const renderCallback = hasRenderCallback ?
					cellData.render :
					dataCell;
				return renderCallback(
					rowNumber,
					colNumber,
					column,
					cellData
				);
			}
		);
		return tableRow( rowCells, rowProps, provided, snapshot );
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} column
	 * @param {Object} cellData
	 * @return {Object} rendered headings row
	 */
	const dataCell = ( rowNumber, colNumber, column, cellData ) => {
		return hasRowHeaders && colNumber === 0 ? (
			headingCell( rowNumber, colNumber, cellData )
		) : (
			<TableDataCell
				key={ `row-${ rowNumber }-col-${ colNumber }` }
				rowNumber={ rowNumber }
				colNumber={ colNumber }
				htmlId={ cellData.id || tableId }
				htmlClass={ cellData.class || '' }
				classes={ cssClasses }
			>
				<ResponsiveCell
					heading={ column.value }
					value={ cellData.value }
				/>
			</TableDataCell>
		);
	};
	const tableHeader = getTableHeader( columns );
	cssClasses.tableClass = classNames(
		cssClasses.tableClass,
		`ee-rspnsv-table-column-count-${ tableColumns.length }`
	);
	const droppableId = `${ tableId }-droppable`;
	return (
		<DragDropContext
			onBeforeDragStart={ onBeforeDragStart }
			onDragStart={ onDragStart }
			onDragUpdate={ onDragUpdate }
			onDragEnd={ onDragEnd }
		>
			<Table
				tableId={ tableId }
				tableClass={ cssClasses.tableClass }
				captionID={ captionID }
				captionText={ tableCaption }
			>
				<TableHeader htmlClass={ cssClasses.headerClass } >
					{ tableHeader }
				</TableHeader>
				<Droppable droppableId={ droppableId }>
				{ (
					{ innerRef, droppableProps, placeholder },
					{ isDraggingOver }
				) => (
					<TableBody
						innerRef={ innerRef }
						htmlClass={ cssClasses.bodyClass }
						style={ {
							border: isDraggingOver ?
								'1px solid var(--ee-color-bright-green)' :
								'none',
							borderSpacing: isDraggingOver ?
								'2px' :
								'0',
						} }
						{ ...droppableProps }
					>
						{ rowData.map(
							( dataRow, index ) => (
								<Draggable
									key={ dataRow[ 0 ].id }
									draggableId={ dataRow[ 0 ].id }
									index={ index }
								>
									{ ( provided, snapshot ) => (
										renderDataRow(
											dataRow,
											provided,
											snapshot
										)
									) }
								</Draggable>
							)
						) }
						{ placeholder }
					</TableBody>
					) }
				</Droppable>
				<TableFooter
					showFooter={ showTableFooter && ! isEmpty( footerData ) }
					htmlClass={ cssClasses.footerClass }
				>
					{ getTableHeader( footerData, true ) }
				</TableFooter>
			</Table>
		</DragDropContext>
	);
};

ResponsiveTable.propTypes = {
	instanceId: PropTypes.number,
	columns: PropTypes.arrayOf(
		PropTypes.shape( {
			type: PropTypes.string.isRequired,
			value: PropTypes.oneOfType( [
				PropTypes.object,
				PropTypes.number,
				PropTypes.string,
			] ).isRequired,
			key: PropTypes.string,
			id: PropTypes.string,
			class: PropTypes.string,
			extraProps: PropTypes.object,
		} )
	).isRequired,
	rowData: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape( {
				type: PropTypes.string.isRequired,
				value: PropTypes.oneOfType( [
					PropTypes.object,
					PropTypes.number,
					PropTypes.string,
				] ).isRequired,
				id: PropTypes.string,
				class: PropTypes.string,
				render: PropTypes.func,
				extraProps: PropTypes.object,
			} )
		)
	).isRequired,
	metaData: PropTypes.shape( {
		tableId: PropTypes.string.isRequired,
		tableCaption: PropTypes.string.isRequired,
		showTableFooter: PropTypes.bool,
		hasRowHeaders: PropTypes.bool,
	} ).isRequired,
	classes: PropTypes.shape( {
		tableClass: PropTypes.string,
		headerClass: PropTypes.string,
		headerRowClass: PropTypes.string,
		headerThClass: PropTypes.string,
		bodyClass: PropTypes.string,
		bodyRowClass: PropTypes.string,
		bodyThClass: PropTypes.string,
		bodyTdClass: PropTypes.string,
		footerClass: PropTypes.string,
		footerRowClass: PropTypes.string,
		footerThClass: PropTypes.string,
	} ),
};

export default withInstanceId( ResponsiveTable );
