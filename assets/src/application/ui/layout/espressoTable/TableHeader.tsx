import React from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import warning from 'warning';

import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';

import { RowType, TableHeaderProps } from './types';

const TableHeader: React.FC<TableHeaderProps> = ({ headerRows, showDragHandle, tableId, ...props }) => {
	const className = classNames(props.className.headerClassName, 'ee-rspnsv-table-header');
	const theadProps: React.HTMLAttributes<HTMLElement> = {
		...props,
		className,
	};

	return (
		<thead {...theadProps}>
			{headerRows.map((headerRow, row) => (
				<TableRow
					className={props.className}
					id={headerRow.id || `${tableId}-header`}
					headerRowClassName={headerRow.className || ''}
					key={`header-row-${row}`}
					rowData={headerRow}
					rowNumber={row}
					rowType={RowType.header}
				>
					{headerRow.cells.map((column, col) => {
						warning(column.hasOwnProperty('value'), `Missing "value" property for header column ${col}.`);

						return isFunction(column.render) ? (
							column.render({ row, col, column })
						) : (
							<TableHeaderCell
								className={props.className}
								colNumber={col}
								key={`row-${row}-col-${col}`}
								rowNumber={row}
								rowType={RowType.header}
								id={column.id || `${tableId}-header-cell`}
								tableHeaderCellClassName={column.className}
							>
								{column.value || ''}
							</TableHeaderCell>
						);
					})}

					{showDragHandle && (
						<TableHeaderCell
							className={props.className}
							colNumber={headerRow.cells.length}
							key={`row-${row}-col-${headerRow.cells.length}`}
							rowNumber={row}
							rowType={RowType.header}
							id={`${tableId}-header-cell-draghandle`}
						/>
					)}
				</TableRow>
			))}
		</thead>
	);
};

export default TableHeader;
