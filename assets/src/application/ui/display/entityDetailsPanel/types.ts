import React from 'react';

export interface EntityDetailsPanelProps {
	details: Array<EntityDetailProps>;
	className?: string;
}

export interface EntityDetailProps {
	render?: React.ElementType;
	id?: string;
	label?: string;
	value?: number | string | React.ReactNode | HTMLElement;
	className?: string;
	[key: string]: any; // custom props to component
}

export interface DetailsSeparatorProps {
	last?: boolean;
}
