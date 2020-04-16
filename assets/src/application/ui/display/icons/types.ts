export interface IconProps {
	name: IconName | keyof SvgPath;
	svgSize?: number;
	className?: string;
	viewBox?: string;
}

export enum IconName {
	CALCULATOR = 'calculator',
	CALENDAR = 'calendar',
	CLOSE = 'close',
	COPY = 'copy',
	EDIT = 'edit',
	FILTER = 'filter',
	GLOBALOUTLINED = 'globalOutlined',
	GROUPS = 'groups',
	LINK = 'admin-links',
	MORE = 'more',
	REM = 'rem',
	ROTATE = 'rotate',
	SAVE = 'save',
	TABLE_VIEW = 'table-view',
	TICKET = 'ticket-alt',
	TRASH = 'trash',
	UNLINK = 'editor-unlink',
}

export type SvgPath = {
	[key in IconName]: string;
};
