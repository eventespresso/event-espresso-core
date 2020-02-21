import React from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import warning from 'warning';

/**
 * Internal dependencies
 */
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';

const EMPTY_ARRAY = [];

/**
 * @param {string} tableId
 * @param {Array} footerRows
 * @param {Object} cssClasses
 * @param {number} rowCount
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableFooter = ({ tableId, cssClasses, footerRows, rowCount, ...extraProps }) => {
	const htmlClass = classNames(cssClasses.footerClass, 'ee-rspnsv-table-footer');
	return footerRows !== EMPTY_ARRAY ? (
		<tfoot className={htmlClass} {...extraProps}>
			{footerRows.map((footerRow, row) => {
				row += rowCount;
				return (
					<TableRow
						rowData={footerRow}
						key={`row-${row}`}
						rowNumber={row}
						rowType={'footer'}
						htmlId={footerRow.id || tableId}
						htmlClass={footerRow.class || ''}
						cssClasses={cssClasses}
					>
						{footerRow.cells.map((column, col) => {
							warning(
								column.hasOwnProperty('value'),
								`Missing "value" property for footer column ${col}.`
							);
							return isFunction(column.render) ? (
								column.render(row, col, column)
							) : (
								<TableHeaderCell
									key={`row-${row}-col-${col}`}
									rowNumber={row}
									colNumber={col}
									rowType={'footer'}
									htmlId={column.id || tableId}
									htmlClass={column.class || ''}
									cssClasses={cssClasses}
								>
									{column.value || ''}
								</TableHeaderCell>
							);
						})}
					</TableRow>
				);
			})}
		</tfoot>
	) : null;
};

// TableFooter.propTypes = {
// 	tableId: PropTypes.string.isRequired,
// 	rowCount: PropTypes.number.isRequired,
// 	cssClasses: PropTypes.object,
// 	footerRows: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			type: PropTypes.string.isRequired,
// 			key: PropTypes.string.isRequired,
// 			id: PropTypes.string,
// 			class: PropTypes.string,
// 			extraProps: PropTypes.object,
// 			cells: PropTypes.arrayOf(
// 				PropTypes.shape({
// 					type: PropTypes.string.isRequired,
// 					key: PropTypes.string.isRequired,
// 					value: PropTypes.node.isRequired,
// 					id: PropTypes.string,
// 					class: PropTypes.string,
// 					render: PropTypes.func,
// 					extraProps: PropTypes.object,
// 				})
// 			).isRequired,
// 		})
// 	),
// };

// TableFooter.defaultProps = {
// 	footerRows: EMPTY_ARRAY,
// 	cssClasses: {},
// };

export default TableFooter;
