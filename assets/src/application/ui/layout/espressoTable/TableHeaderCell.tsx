import React from 'react';
import classNames from 'classnames';

import { TableHeaderCellProps } from './types';

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
	children,
	colNumber,
	tableHeaderCellClassName = '',
	rowNumber,
	rowType,
	...props
}) => {
	const id = props.id
		? `${props.id}-${rowType}-row-${rowNumber}-col-${colNumber}`
		: `ee-rspnsv-table-${rowType}-row-${rowNumber}-col-${colNumber}`;

	const rowTypeClass = rowType + 'ThClass';

	const className = classNames(
		{
			[`${tableHeaderCellClassName} ee-rspnsv-table-${rowType}-th ee-col-${colNumber}`]: tableHeaderCellClassName,
			[`ee-rspnsv-table-${rowType}-th ee-col-${colNumber}`]: !tableHeaderCellClassName,
		},
		props.className[rowTypeClass]
	);

	if (rowType === 'header') {
		props.role = 'columnheader';
		props.scope = 'col';
	} else if (rowType === 'body') {
		props.scope = 'row';
	}

	const tableHeaderProps: React.HTMLAttributes<HTMLElement> = {
		...props,
		className,
		id,
	};

	return <th {...tableHeaderProps}>{children}</th>;
};

export default TableHeaderCell;
