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
	render: ({ row, col, column, cellData }) => React.ReactNode;
}

export interface HeaderRow {
	cells: Cell[];
	children?: React.ReactNode;
	className?: string;
	extraProps: object;
	id?: string;
	key: string;
	type: string;
}

export interface TableRow {
	type: string;
	key: string;
	id?: string;
	className?: string;
	cells: Cell[];
}

export interface TableBodyProps {
	className: TableClassName;
	headerRowCount: number;
	hasRowHeaders: boolean;
	onBeforeDragStart: () => void;
	onDragEnd: () => void;
	onDragStart: () => void;
	onDragUpdate: () => void;
	primaryHeader: any;
	tableId: TableId;
	tableRows: TableRowProps[];
}

export interface TableHeaderProps {
	className: TableClassName;
	headerRows: HeaderRow[];
	tableId: TableId;
}

export interface TableRowProps {
	cells: Cell[];
	children: React.ReactNode;
	className: TableClassName;
	headerRows: HeaderRow[];
	headerRowCount: number;
	htmlId?: string;
	id?: string;
	key: string;
	rowData: any;
	// rowData: {
	// 	className?: string;
	// 	key: string;
	// };
	rowClassName: any;
	rowNumber: number;
	rowType?: string;
	sortable?: boolean;
}

type TableId = string;
