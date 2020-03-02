interface Cell {
	type: string;
	key: string;
	value: React.ReactNode;
	id?: string;
	className?: string;
	render?: ({ row, col, column }) => JSX.Element;
}

interface FooterRow {
	cells: Cell[];
	footerRowClassName?: string;
	id?: string;
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

export enum RowType {
	body = 'body',
	footer = 'footer',
	header = 'header',
}

export interface TableFooterProps {
	className: TableClassName;
	footerRows: FooterRow[];
	tableId: string;
	rowCount: number;
}

export interface TableHeaderProps {
	className: TableClassName;
	headerRows: HeaderRow[];
	tableId: TableId;
}

export interface TableRowProps {
	cells?: Cell[];
	children: React.ReactNode;
	className: TableClassName;
	headerRows?: HeaderRow[];
	headerRowCount?: number;
	htmlId?: string;
	id?: string;
	key: string;
	rowData: any;
	rowClassName: any;
	rowNumber: number;
	rowType?: RowType;
	sortable?: boolean;
}

type TableId = string;
