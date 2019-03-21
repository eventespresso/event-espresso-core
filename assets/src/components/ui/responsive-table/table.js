/**
 * External imports
 */
import { isEmpty, isFunction } from 'lodash';
import warning from 'warning';
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * ResponsiveDataGrid responsive-table
 * produces a table like structure for displaying tabular data
 * in a grid that collapses properly on smaller screens
 *

 * @param {Array} columnHeaders
 * @param {Array} rowHeaders
 * @param {Array} tableData
 * @param {Object} metaData
 */
class ResponsiveTable extends Component {
	static propTypes = {
		columns: PropTypes.arrayOf(
			PropTypes.shape( {
				type: PropTypes.string.isRequired,
				value: PropTypes.oneOfType( [
					PropTypes.object,
					PropTypes.number,
					PropTypes.string,
				] ).isRequired,
				id: PropTypes.string,
				class: PropTypes.string,
				label: PropTypes.string,
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
					] ),
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
			headerRowClass: PropTypes.string,
			headerThClass: PropTypes.string,
			bodyRowClass: PropTypes.string,
			bodyThClass: PropTypes.string,
			bodyTdClass: PropTypes.string,
			footerRowClass: PropTypes.string,
			footerThClass: PropTypes.string,
		} ),
	};

	// constructor( props ) {
	// 	super( props );
	// }

	componentWillMount() {
		console.log( '' );
		console.log( 'ResponsiveTable.componentWillMount()' );
		console.log( ' > props: ', this.props );
	}

	/**
	 * @function
	 * @param {Object} metaData
	 */
	setMetaData = ( metaData ) => {
		this.tableId = metaData.tableId ?
			metaData.tableId :
			'ee-rTable-' +
			Math.random().toString( 36 ).substr( 2, 9 );
		this.tableCaption = metaData.tableCaption ?
			metaData.tableCaption :
			'';
		this.captionID = `${ this.tableId }-caption`;
		this.showTableFooter = metaData.showTableFooter ?
			metaData.showTableFooter :
			false;
		this.hasRowHeaders = metaData.hasRowHeaders ?
			metaData.hasRowHeaders :
			false;
	};

	/**
	 * @function
	 * @param {Object} classes
	 */
	setCssClasses = ( classes ) => {
		this.tableClass = classes.tableClass ?
			`${ classes.tableClass } ee-rTable` :
			`ee-rTable`;
		this.tableClass = this.hasRowHeaders ?
			`${ this.tableClass } ee-rTable-has-row-headers` :
			this.tableClass;
		this.headerRowClass = classes.headerRowClass ?
			`${ classes.headerRowClass } ee-rTable-header-row` :
			`ee-rTable-header-row`;
		this.headerThClass = classes.headerThClass ?
			`${ classes.headerThClass } ee-rTable-header-th` :
			`ee-rTable-header-th`;
		this.bodyRowClass = classes.bodyRowClass ?
			`${ classes.bodyRowClass } ee-rTable-body-row` :
			`ee-rTable-body-row`;
		this.bodyThClass = classes.bodyThClass ?
			`${ classes.bodyThClass } ee-rTable-body-th` :
			`ee-rTable-body-th`;
		this.bodyTdClass = classes.bodyTdClass ?
			`${ classes.bodyTdClass } ee-rTable-body-td` :
			`ee-rTable-body-td`;
		this.footerRowClass = classes.footerRowClass ?
			`${ classes.footerRowClass } ee-rTable-footer-row` :
			`ee-rTable-footer-row`;
		this.footerThClass = classes.footerThClass ?
			`${ classes.footerThClass } ee-rTable-footer-th` :
			`ee-rTable-footer-th`;
	};

	/**
	 * @function
	 * @param {Array} columns
	 * @return {Object} rendered headings row
	 */
	tableHeader = ( columns ) => {
		// console.log( '' );
		// console.log( 'ResponsiveTable.tableHeader()' );
		let rowProps = {};
		const rowNumber = 0;
		const headerCells = columns.map(
			( column, colNumber ) => {
				// console.log( ' > column', colNumber );
				if ( column.hasOwnProperty( 'type' ) && column.type === 'row' ) {
					rowProps = column;
					// console.log( ' > rowProps', rowProps );
					colNumber--;
					return null;
				}
				const hasRenderCallback = isFunction( column.render );
				warning(
					hasRenderCallback || column.hasOwnProperty( 'value' ),
					`Missing "value" property for column header ${ colNumber }.`
				);
				const renderCallback = hasRenderCallback ?
					column.render :
					this.headerCell;
				return renderCallback( rowNumber, colNumber, column );
			}
		);
		const rowId = rowProps.id ?
			rowProps.id :
			`ee-rTable-row-${ rowNumber }`;
		const rowClass = rowProps.class ?
			`${ rowProps.class } ${ this.headerRowClass }` :
			this.headerRowClass;
		return (
			<tr key={ `row-${ rowNumber }` } id={ rowId } className={ rowClass } >
				{ headerCells }
			</tr>
		);
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} column
	 * @return {Object} rendered column header cell
	 */
	headerCell = ( rowNumber, colNumber, column ) => {
		const columnId = column.id ?
			column.id :
			`ee-rTable-row-${ rowNumber }-col-${ colNumber }`;
		const columnClass = column.class ?
			`${ column.class } ${ this.headerThClass }` :
			this.headerThClass;
		const extraProps = column.extraProps ?
			column.extraProps :
			{};
		return (
			<th
				role="columnheader"
				scope="col"
				key={ colNumber }
				id={ columnId }
				className={ columnClass }
				{ ...extraProps }
			>
				{ column.value }
			</th>
		);
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {Array} tableRow
	 * @param {Array} columns
	 * @return {Object} rendered data row
	 */
	tableRow = ( rowNumber, tableRow, columns ) => {
		rowNumber++; // because the header is row 0
		// console.log( '' );
		// console.log( ' > rowNumber', rowNumber );
		warning(
			Array.isArray( tableRow ),
			`Data for row ${ rowNumber } is not an array.`
		);
		let rowProps = {};
		let indexMod = 0;
		const rowCells = tableRow.map(
			( cellData, colNumber ) => {
				if ( cellData.hasOwnProperty( 'type' ) && cellData.type === 'row' ) {
					rowProps = cellData;
					// console.log( ' > rowProps', rowProps );
					indexMod++;
					return null;
				}
				colNumber -= indexMod;
				// console.log( ' > > column', colNumber );
				const column = columns[ colNumber ];
				const hasRenderCallback = isFunction( cellData.render );
				warning(
					hasRenderCallback || cellData.hasOwnProperty( 'value' ),
					`Missing "value" property for table cell at ` +
					`row ${ rowNumber } column ${ colNumber }.`
				);
				const renderCallback = hasRenderCallback ?
					cellData.render :
					this.tableCell;
				return renderCallback(
					rowNumber,
					colNumber,
					column,
					cellData
				);
			}
		);
		const rowId = rowProps.id ?
			rowProps.id :
			`ee-rTable-row-${ rowNumber }`;
		const rowClass = rowProps.class ?
			`${ rowProps.class } ${ this.bodyRowClass }` :
			this.headerRowClass;
		return (
			<tr key={ `row-${ rowNumber }` } id={ rowId } className={ rowClass }>
				{ rowCells }
			</tr>
		)
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} column
	 * @param {Object} cellData
	 * @return {Object} rendered headings row
	 */
	tableCell = ( rowNumber, colNumber, column, cellData ) => {
		console.log( ' > row '+ rowNumber + ' col ' + colNumber );
		const isRowHeader = this.hasRowHeaders && colNumber === 0;
		console.log( ' > > isRowHeader ', isRowHeader );
		const columnId = cellData.id ?
			cellData.id :
			`ee-rTable-row-${ rowNumber }-col-${ colNumber }`;
		let columnClass = isRowHeader ?
			this.bodyThClass :
			this.bodyTdClass;
		columnClass = cellData.class ?
			`${ cellData.class } ${ columnClass }` :
			columnClass;
		const extraProps = cellData.extraProps ?
			cellData.extraProps :
			{};
		return isRowHeader ? (
			<th
				key={ `row-${ rowNumber }-col-${ colNumber }` }
				scope="row"
				id={ columnId }
				className={ columnClass }
				{ ...extraProps }
			>
				{ cellData.value }
			</th>
		) : (
			<td
				key={ `row-${ rowNumber }-col-${ colNumber }` }
				id={ columnId }
				className={ columnClass }
				data-label={ column.label ? column.label : '' }
				{ ...extraProps }
			>
				{ cellData.value }
			</td>
		);
	};

	/**
	 * @function
	 * @param {Object} columns
	 * @return {Object} rendered headings row
	 */
	footerRow = ( columns ) => {
	};

	render() {
		const { columns, rowData, metaData, classes } = this.props;
		if ( isEmpty( columns ) ) {
			return null;
		}
		this.setMetaData( metaData );
		this.setCssClasses( classes ? classes : {} );
		this.columnCount = columns.length;
		this.tableClass += ` ee-rTable-column-count-${ this.columnCount }`;
		const tableFooter = this.showTableFooter ? (
			<tfoot className="ee-rTable-footer">
			{ this.footerRow( columns ) }
			</tfoot>
		) : null;
		return (
			<div
				role={ 'region' }
				aria-labelledby={ this.captionID }
				tabIndex="0"
			>
				<table id={ this.tableId } className={ this.tableClass } >
					<caption
						id={ this.captionID }
						className={ 'screen-reader-text' }
					>
						{ this.tableCaption }
					</caption>
					<thead className="ee-rTable-header">
						{ this.tableHeader( columns ) }
					</thead>
					<tbody className="ee-rTable-body">
						{
							rowData.map(
								( tableRow, rowNumber ) => this.tableRow(
									rowNumber,
									tableRow,
									columns
								)
							)
						}
					</tbody>
					{ tableFooter }
				</table>
			</div>
		);
	}
}

export default ResponsiveTable;
