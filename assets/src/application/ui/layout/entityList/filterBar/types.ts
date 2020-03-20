import React from 'react';
import { EntityListFilterStateManager as ELFSM, View } from './filterState';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';

export interface CollapsibleProps {
	show: boolean;
}

export interface EntityListFilterBarProps<FS extends ELFSM> {
	domain: string;
	filterState: FS;
	legendConfig: LegendConfig;
	listId?: string;
}

export interface FilterButtonWrapProps {
	id: string;
	label: string;
}

export interface CardViewFilterButtonProps extends View {
	listId?: string;
	setCardView: VoidFunction;
}

export interface TableViewFilterButtonProps extends View {
	listId?: string;
	setTableView: () => void;
}

export interface ToggleFiltersButtonProps {
	listId?: string;
	showFilters?: boolean;
	toggleFilters: VoidFunction;
}

export interface ToggleLegendButtonProps {
	listId?: string;
	showLegend?: boolean;
	toggleLegend: VoidFunction;
}
