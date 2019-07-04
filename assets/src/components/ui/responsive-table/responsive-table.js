/**
 * External imports
 */
import { first, isArray, isEmpty, isFunction } from 'lodash';
import warning from 'warning';
import PropTypes from 'prop-types';
import { withInstanceId } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import classNames from 'classnames';

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
		instanceId: PropTypes.number,
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

	/**
	 * @function
	 * @param {number} instanceId
	 * @param {Object} metaData
	 */
	setMetaData = ( instanceId, metaData = {} ) => {
		this.tableId = `ee-rspnsv-table-${ instanceId }`;
		this.tableCaption = metaData.tableCaption || '';
		this.captionID = `${ this.tableId }-caption`;
		this.showTableFooter = typeof metaData.showTableFooter === 'undefined' ?
			true : metaData.showTableFooter;
		this.hasRowHeaders = !! metaData.hasRowHeaders;
	};

	/**
	 * @function
	 * @param {Object} classes
	 */
	setCssClasses = ( classes ) => {
		this.classes = {
			tableClass: classes.tableClass || '',
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
		this.classes.tableClass = classNames(
			this.classes.tableClass,
			{
				'ee-rspnsv-table-has-row-headers': this.hasRowHeaders
			}
		);
	};

	/**
	 * @function
	 * @param {Array} columns
	 * @param {boolean} isFooter
	 * @return {Object} rendered headings row
	 */
	tableHeader = ( columns, isFooter = false ) => {
		this.rowNumber++;
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
				this.columns.push( column );
				colNumber -= indexMod;
				const hasRenderCallback = isFunction( column.render );
				warning(
					hasRenderCallback || column.hasOwnProperty( 'value' ),
					`Missing "value" property for ${ rowType } column ${ colNumber }.`
				);
				const renderCallback = hasRenderCallback ?
					column.render :
					this.headingCell;
				return renderCallback( this.rowNumber, colNumber, column );
			}
		);
		return this.tableRow( headerCells, rowProps );
	};

	/**
	 * @function
	 * @param {Array} cells
	 * @param {Object} rowProps
	 * @return {Object} rendered <tr> element
	 */
	tableRow = ( cells, rowProps = {} ) => {
		return (
			<TableRow
				key={ `row-${ this.rowNumber }` }
				rowNumber={ this.rowNumber }
				rowType={ rowProps.rowType || 'body' }
				htmlId={ rowProps.id || this.tableId }
				htmlClass={ rowProps.class || '' }
				classes={ this.classes }
			>
				{ cells }
			</TableRow>
		);
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} cellProps
	 * @return {Object} rendered column header cell
	 */
	headingCell = ( rowNumber, colNumber, cellProps ) => {
		return (
			<TableHeadingCell
				key={ `row-${ rowNumber }-col-${ colNumber }` }
				rowNumber={ rowNumber }
				colNumber={ colNumber }
				rowType={ cellProps.rowType || 'body' }
				htmlId={ cellProps.id || this.tableId }
				htmlClass={ cellProps.class || '' }
				classes={ this.classes }
			>
				{ cellProps.value || '' }
			</TableHeadingCell>
		);
	};

	/**
	 * @function
	 * @param {Array} dataRow
	 * @return {Object} rendered data row
	 */
	dataRow = ( dataRow ) => {
		this.rowNumber++;
		warning(
			isArray( dataRow ),
			`Data for row ${ this.rowNumber } is not an array.`
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
				const column = this.columns[ colNumber ];
				if ( ! column ) {
					warning(
						false,
						`Missing data for column ${ colNumber } ` +
						`in row ${ this.rowNumber }.`
					);
					return null;
				}
				const hasRenderCallback = isFunction( cellData.render );
				warning(
					hasRenderCallback || cellData.hasOwnProperty( 'value' ),
					`Missing "value" property for table cell at ` +
					`row ${ this.rowNumber } column ${ colNumber }.`
				);
				const renderCallback = hasRenderCallback ?
					cellData.render :
					this.dataCell;
				return renderCallback(
					this.rowNumber,
					colNumber,
					column,
					cellData
				);
			}
		);
		return this.tableRow( rowCells, rowProps );
	};

	/**
	 * @function
	 * @param {number} rowNumber
	 * @param {number} colNumber
	 * @param {Object} column
	 * @param {Object} cellData
	 * @return {Object} rendered headings row
	 */
	dataCell = ( rowNumber, colNumber, column, cellData ) => {
		return this.hasRowHeaders && colNumber === 0 ? (
			this.headingCell( rowNumber, colNumber, cellData )
		) : (
			<TableDataCell
				key={ `row-${ rowNumber }-col-${ colNumber }` }
				rowNumber={ rowNumber }
				colNumber={ colNumber }
				htmlId={ cellData.id || this.tableId }
				htmlClass={ cellData.class || '' }
				classes={ this.classes }
			>
				<ResponsiveCell
					heading={ column.value }
					value={ cellData.value }
				/>
			</TableDataCell>
		);
	};

	render() {
		const {
			instanceId,
			columns = [],
			rowData = [],
			footerData = [],
			metaData = {},
			classes = {},
		} = this.props;
		if ( isEmpty( columns ) ) {
			return null;
		}
		this.setMetaData( instanceId, metaData );
		this.setCssClasses( classes || {} );
		this.columns = [];
		this.rowNumber = -1;
		const tableHeader = this.tableHeader( columns );
		this.classes.tableClass = classNames(
			this.classes.tableClass,
			`ee-rspnsv-table-column-count-${ this.columns.length }`
		);
		this.showTableFooter = this.showTableFooter && ! isEmpty( footerData );
		return (
			<Table
				tableId={ this.tableId }
				tableClass={ this.classes.tableClass }
				captionID={ this.captionID }
				captionText={ this.tableCaption }
			>
				<TableHeader htmlClass={ this.classes.headerClass } >
					{ tableHeader }
				</TableHeader>
				<TableBody htmlClass={ this.classes.bodyClass }>
					{ rowData.map(
						( dataRow ) => this.dataRow( dataRow )
					) }
				</TableBody>
				<TableFooter
					showFooter={ this.showTableFooter }
					htmlClass={ this.classes.footerClass }
				>
					{ this.tableHeader( footerData, true ) }
				</TableFooter>
			</Table>
		);
	}
}

export default withInstanceId( ResponsiveTable );
