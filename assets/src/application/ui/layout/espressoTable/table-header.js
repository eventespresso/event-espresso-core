/**
 * External imports
 */
import classNames from 'classnames';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import warning from 'warning';

/**
 * Internal dependencies
 */
import TableRow from './table-row';
import TableHeaderCell from './table-header-cell';

/**
 * @param {string} tableId
 * @param {Array} headerRows
 * @param {Object} cssClasses
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableHeader = ({ tableId, headerRows, cssClasses, ...extraProps }) => {
	const htmlClass = classNames(cssClasses.headerClass, 'ee-rspnsv-table-header');
	return (
		<thead className={htmlClass} {...extraProps}>
			{headerRows.map((headerRow, row) => (
				<TableRow
					rowData={headerRow}
					key={`header-row-${row}`}
					rowNumber={row}
					rowType={'header'}
					htmlId={headerRow.id || tableId}
					htmlClass={headerRow.className || ''}
					cssClasses={cssClasses}
				>
					{headerRow.cells.map((column, col) => {
						warning(column.hasOwnProperty('value'), `Missing "value" property for header column ${col}.`);
						return isFunction(column.render) ? (
							column.render(row, col, column)
						) : (
							<TableHeaderCell
								key={`row-${row}-col-${col}`}
								rowNumber={row}
								colNumber={col}
								rowType={'header'}
								htmlId={column.id || tableId}
								htmlClass={column.className || ''}
								cssClasses={cssClasses}
							>
								{column.value || ''}
							</TableHeaderCell>
						);
					})}
				</TableRow>
			))}
		</thead>
	);
};

TableHeader.propTypes = {
	tableId: PropTypes.string.isRequired,
	cssClasses: PropTypes.object,
	headerRows: PropTypes.arrayOf(
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
};

TableHeader.defaultProps = {
	cssClasses: {},
};

export default TableHeader;
