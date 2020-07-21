import React from 'react';
import { AnyObject } from '@appServices/utilities/types';

/* alignments correspond to CSS flexbox justify-content values */
export type Alignments =
	| 'start' // start: items are packed toward the start of the writing-mode direction.
	| 'center' // center: items are centered along the line
	| 'end' // end: items are packed toward the end of the writing-mode direction.
	| 'top' // flex-start: items are packed toward the top of vertically aligned elements
	| 'bottom' // flex-end: items are packed toward the bottom of vertically aligned elements
	| 'evenly' // space-evenly: spacing between all items and edges is equal.
	| 'space' // space-around: items are evenly distributed in the line with equal space around them.
	| 'wide'; // space-between: items are evenly distributed with no space on either end

export interface ConditionalElementProps {
	align?: Alignments;
	className: string;
	tag: 'aside' | 'div' | 'footer' | 'header' | 'p' | 'section';
}

export interface ContainerProps extends AnyObject {
	classes: ContainerClasses;
	content: React.ReactNode;
	footer?: React.ReactNode;
	header?: React.ReactNode;
	sidebarAfter?: React.ReactNode;
	sidebarBefore?: React.ReactNode;
}

interface ContainerClasses {
	body?: string;
	container?: string;
	content?: string;
	footer?: string;
	header?: string;
	sidebarAfter?: string;
	sidebarBefore?: string;
}

export interface ContentProps {
	align?: Alignments;
	as?: 'div' | 'p';
	className?: string;
}

export interface FooterProps {
	align?: Alignments;
	as?: 'div' | 'footer';
	className?: string;
}

export interface HeaderProps {
	align?: Alignments;
	as?: 'div' | 'header';
	className?: string;
}

export interface SidebarProps {
	align?: Alignments;
	as?: 'div' | 'aside';
	before?: boolean;
	className?: string;
}

export interface StackProps {
	align?: Alignments;
	as?: 'div' | 'section';
	className?: string;
}

export interface RowProps {
	align?: Alignments;
	as?: 'div' | 'section';
	className?: string;
	reverse?: boolean;
}
