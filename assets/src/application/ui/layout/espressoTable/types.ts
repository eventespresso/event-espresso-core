import { Responders } from 'react-beautiful-dnd';

interface Cell {
	type: string;
	key: string;
	value: React.ReactNode;
	id?: string;
	className?: string;
	render?: (props: CellRender) => JSX.Element;
}

interface CellRender {
	row: any;
	col: any;
	column: any;
	cellData?: any;
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
	primary: boolean;
	type: string;
}

export interface ResponsiveCellProps {
	heading: string;
	value: string;
}

export interface ResponsiveTableProps extends Responders {
	className: TableClassName;
	footerRows: FooterRow[];
	headerRows: HeaderRow[];
	instanceId: string;
	metaData: {
		tableCaption: string;
		tableId?: string;
		hasRowHeaders?: boolean;
	};
	tableRows: TableRowProps[];
}

export enum RowType {
	body = 'body',
	footer = 'footer',
	header = 'header',
}

export interface TableProps {
	captionID: string;
	captionText: string;
	children: React.ReactNode;
	className?: string;
	tableId?: string;
}

export interface TableBodyProps extends Responders {
	className: TableClassName;
	headerRowCount: number;
	hasRowHeaders: boolean;
	primaryHeader: any;
	tableId: TableId;
	tableRows: TableRowProps[];
}

export interface TableDataCellProps {
	className: TableClassName;
	children: React.ReactNode;
	rowNumber: number;
	colNumber: number;
	htmlId?: string;
	htmlClassName?: string;
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

export interface TableHeaderCellProps {
	className: TableClassName;
	colNumber: number;
	id?: string;
	// WAI-ARIA
	role?: string;
	rowNumber: number;
	rowType?: RowType;
	scope?: string;
	tableHeaderCellClassName?: string;
}

export interface TableRowProps {
	cells?: Cell[];
	children: React.ReactNode;
	className: TableClassName;
	headerRows?: HeaderRow[];
	headerRowClassName?: string;
	headerRowCount?: number;
	htmlId?: string;
	id?: string;
	key: string;
	rowData: any;
	rowClassName?: string;
	rowNumber: number;
	rowType?: RowType;
	sortable?: boolean;
}

type TableId = string;
