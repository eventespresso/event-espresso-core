import React from 'react';
import { EntityListFilterStateManager as ELFSM } from './filterState';
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

export interface GridViewFilterButtonProps {
	listId?: string;
	setGridView: VoidFunction;
	view?: string;
}

export interface ListViewFilterButtonProps {
	listId?: string;
	setListView: () => void;
	view?: string;
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
