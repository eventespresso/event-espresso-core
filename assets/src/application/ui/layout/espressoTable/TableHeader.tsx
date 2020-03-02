import React from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import warning from 'warning';

import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';

import { TableHeaderProps } from './types';

const TableHeader: React.FC<TableHeaderProps> = ({ headerRows, tableId, ...props }) => {
	const className = classNames(props.className.headerClassNameName, 'ee-rspnsv-table-header');

	return (
		<thead className={className}>
			{headerRows.map((headerRow, row) => (
				<TableRow
					rowData={headerRow}
					key={`header-row-${row}`}
					rowNumber={row}
					rowType={'header'}
					htmlId={headerRow.id || tableId}
					htmlClass={headerRow.className || ''}
					className={className}
				>
					{headerRow.cells.map((column, col) => {
						warning(column.hasOwnProperty('value'), `Missing "value" property for header column ${col}.`);
						return isFunction(column.render) ? (
							column.render({ row, col, column })
						) : (
							<TableHeaderCell
								key={`row-${row}-col-${col}`}
								rowNumber={row}
								colNumber={col}
								rowType={'header'}
								htmlId={column.id || tableId}
								htmlClass={column.className || ''}
								className={className}
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
