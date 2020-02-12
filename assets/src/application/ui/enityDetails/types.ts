import React from 'react';

export interface EntityDetailsPanelProps {
	details: Array<EntityDetailProps>;
	htmlClass?: string;
}

export interface EntityDetailProps {
	render?: React.ElementType;
	id?: string;
	label?: string;
	value?: number | string | React.ReactNode | HTMLElement;
	htmlClass?: string;
	[key: string]: any; // custom props to component
}

export interface DetailsSeparatorProps {
	last?: boolean;
}
