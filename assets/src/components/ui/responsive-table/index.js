/**
 * External imports
 */
import { first, isEmpty, isFunction } from 'lodash';
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
			tableId: PropTypes.string,
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
			true;
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
	 * @param {number} rowNumber
	 * @param {Array} columns
	 * @param {boolean} isFooter
	 * @return {Object} rendered headings row
	 */
	tableHeader = ( rowNumber, columns, isFooter = false ) => {
		let rowProps = {};
		const rowType = isFooter === true ? 'footer' : 'header';
		let indexMod = 0;

		// check if columns is <TableHeader> and if it has children

		const headerCells = columns.map(
			( column, colNumber ) => {

				// check if column is <TableHeaderCell> and if it has children

				if ( column.type && column.type === 'row' ) {
					rowProps = column;
					indexMod++;
					return null;
				}
				colNumber -= indexMod;
				const hasRenderCallback = isFunction( column.render );
				warning(
					hasRenderCallback || column.hasOwnProperty( 'value' ),
					`Missing "value" property for column ${ rowType } ${ colNumber }.`
				);
				const renderCallback = hasRenderCallback ?
					column.render :
					this.headerCell;
				return renderCallback( rowNumber, colNumber, column, rowType );
			}
		);
		const rowId = rowProps.id ?
			rowProps.id :
			`ee-rTable-row-${ rowNumber }`;
		let rowClass = rowProps.class || '';
		rowClass = rowType === 'header' ?
			`${ rowClass } ${ this.headerRowClass } row-${ rowNumber }` :
			`${ rowClass } ${ this.footerRowClass } row-${ rowNumber }`;
		return (
			<tr key={ `row-${ rowNumber }` } id={ rowId }
				className={ rowClass }>
				{ headerCells }
			</tr>
		);
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} column
	 * @param {string} rowType
	 * @return {Object} rendered column header cell
	 */
	headerCell = ( rowNumber, colNumber, column, rowType ) => {
		const columnId = column.id ?
			column.id :
			`ee-rTable-row-${ rowType }-${ rowNumber }-col-${ colNumber }`;
		let columnClass = column.class || '';
		columnClass = rowType === 'header' ?
			`${ columnClass } ${ this.headerThClass } col-${ colNumber }` :
			`${ columnClass } ${ this.footerThClass } col-${ colNumber }`;
		const extraProps = column.extraProps ?
			column.extraProps :
			{};
		return rowType === 'header' ? (
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
		) : (
			<th
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
		warning(
			Array.isArray( tableRow ),
			`Data for row ${ rowNumber } is not an array.`
		);
		let rowProps = {};
		let indexMod = 0;

		// check if tableRow is <TableBodyRow> and if it has children

		const rowCells = tableRow.map(
			( cellData, colNumber ) => {

				// check if column is <TableBodyCell> and if it has children
				// else check if <TableBodyCell> elements have been supplied
				// and loop thru each one and run its predicate on data
				// (
				// 		which is a callback that returns a boolean that
				// 		indicates whether or not to use that <TableBodyCell>
				// 		for the current data.
				// 		ex:
				//		a predicate could evaluate whether the current data
				//		contains a particular property and if that property
				// 		is of a particular type:
				// 		predicate = ( data ) = {
				//			return data.hasOwnProperty( 'type' ) &&
				//			data.type === 'special-case';
				//		}
				// )

				if ( cellData.type && cellData.type === 'row' ) {
					rowProps = cellData;
					indexMod++;
					return null;
				}
				// first grab correct column from column data
				const column = columns[ colNumber ];
				if ( ! column ) {
					return null;
				}
				// THEN adjust column number used in IDs
				colNumber -= indexMod;
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
			`${ rowProps.class } ${ this.bodyRowClass } row-${ rowNumber }` :
			`${ this.bodyRowClass } row-${ rowNumber }`;
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
		const isRowHeader = this.hasRowHeaders && colNumber === 0;
		const columnId = cellData.id ?
			cellData.id :
			`ee-rTable-row-${ rowNumber }-col-${ colNumber }`;
		let columnClass = isRowHeader ?
			this.bodyThClass :
			this.bodyTdClass;
		columnClass = cellData.class ?
			`${ cellData.class } ${ columnClass } col-${ colNumber }` :
			`${ columnClass } col-${ colNumber }`;
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
				{ cellData.value || '' }
			</th>
		) : (
			<td
				key={ `row-${ rowNumber }-col-${ colNumber }` }
				id={ columnId }
				className={ columnClass }
				{ ...extraProps }
			>
				<div
					aria-hidden
					className={ 'ee-rTable-mobile-only-column-header' }
				>
					{ column.value || '' }
				</div>
				<div
					className={ 'ee-rTable-mobile-only-column-value' }
				>
					{ cellData.value || '' }
				</div>
			</td>
		);
	};

	render() {
		const {
			columns,
			rowData,
			metaData,
			classes,
			footerData = [],
		} = this.props;
		if ( isEmpty( columns ) ) {
			return null;
		}
		this.setMetaData( metaData );
		this.setCssClasses( classes ? classes : {} );
		this.columnCount = columns.length;
		const headerRowData = first( columns );
		if ( headerRowData && headerRowData.type === 'row' ) {
			this.columnCount--;
		}
		this.tableClass += ` ee-rTable-column-count-${ this.columnCount }`;
		const tableHeader = this.tableHeader( 0, columns );
		const tableBody = rowData.map(
			( tableRow, rowNumber ) => this.tableRow(
				rowNumber,
				tableRow,
				columns
			)
		);
		const tableFooter = this.showTableFooter && ! isEmpty( footerData ) ? (
			<tfoot className="ee-rTable-footer">
				{
					this.tableHeader(
						rowData.length + 1,
						footerData,
						true
					)
				}
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
						{ tableHeader }
					</thead>
					<tbody className="ee-rTable-body">
						{ tableBody }
					</tbody>
					{ tableFooter }
				</table>
			</div>
		);
	}
}

export default ResponsiveTable;
