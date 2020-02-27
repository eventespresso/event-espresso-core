import React from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import warning from 'warning';

/**
 * Internal dependencies
 */
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';

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
					htmlClass={headerRow.class || ''}
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
								htmlClass={column.class || ''}
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

export default TableHeader;
