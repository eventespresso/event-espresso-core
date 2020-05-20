import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconName | keyof SvgPath;
	svgSize?: number;
	className?: string;
	viewBox?: string;
	color?: string;
}

export enum IconName {
	CALCULATOR = 'calculator',
	CALENDAR = 'calendar',
	CLOSE = 'close',
	COPY = 'copy',
	EDIT = 'edit',
	FILTER = 'filter',
	GROUPS = 'groups',
	LINK = 'admin-links',
	MORE = 'more',
	REM = 'rem',
	ROTATE = 'rotate',
	SAVE = 'save',
	TICKET = 'ticket-alt',
	UNLINK = 'editor-unlink',
}

export type SvgPath = {
	[key in IconName]: string;
};
