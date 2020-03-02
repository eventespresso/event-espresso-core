interface TableClassName {
	headerClassName?: string;
	headerRowClassName?: string;
	headerThClassName?: string;
	bodyClassName?: string;
	bodyRowClassName?: string;
	bodyThClassName?: string;
	bodyTdClassName?: string;
	footerClassName?: string;
	footerRowClassName?: string;
	footerThClassName?: string;
	tableClassName?: string;
}

interface Cell {
	type: string;
	key: string;
	value: React.ReactNode;
	id?: string;
	className?: string;
	render: ({ row, col, column }) => React.ReactNode;
	extraProps: object;
}

export interface HeaderRow {
	type: string;
	key: string;
	id?: string;
	className?: string;
	extraProps: object;
	cells: Cell[];
}

export interface TableHeaderProps {
	className: TableClassName;
	headerRows: HeaderRow[];
	tableId: string;
}
