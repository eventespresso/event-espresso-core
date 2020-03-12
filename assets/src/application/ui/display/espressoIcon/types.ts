export interface EspressoIconProps {
	icon: Icon | keyof SvgPath;
	svgSize?: number;
	className?: string;
	otherProps?: object;
	isPressed?: boolean;
}

export enum Icon {
	CALCULATOR = 'calculator',
	CALENDAR = 'calendar',
	EDIT = 'edit',
	FILTER = 'filter',
	GROUPS = 'groups',
	LINK = 'admin-links',
	LIST_VIEW = 'list-view',
	MORE = 'more',
	REM = 'rem',
	ROTATE = 'rotate',
	SAVE = 'save',
	TICKET = 'ticket-alt',
	TRASH = 'trash',
	UNLINK = 'editor-unlink',
}

export type SvgPath = {
	[key in Icon]: string;
};
