import React from 'react';
import classNames from 'classnames';

import { TableDataCellProps } from './types';

const TableDataCell: React.FC<TableDataCellProps> = ({
	children,
	colNumber,
	htmlId,
	htmlClassName,
	rowNumber,
	...props
}) => {
	const id = htmlId
		? `${htmlId}-row-${rowNumber}-col-${colNumber}`
		: `ee-rspnsv-table-row-${rowNumber}-col-${colNumber}`;

	const className = classNames(
		htmlClassName,
		'ee-rspnsv-table-body-td',
		`ee-col-${colNumber}`,
		props.className.bodyTdClassName
	);

	return (
		<td id={id} className={className}>
			{children}
		</td>
	);
};

export default TableDataCell;
