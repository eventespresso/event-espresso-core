import { BasicSortBy } from '@appLayout/entityList/filterBar';

export type SortBy = BasicSortBy | 'date' | 'order';

export enum DisplayStartOrEndDate {
	start = 'start',
	end = 'end',
	both = 'both',
}

export interface EntityFilterState {
	displayStartOrEndDate?: DisplayStartOrEndDate;
}

export type EntityFilterActionType = 'SET_DISPLAY_START_OR_END_DATE';

export interface EntityFilterAction<AcionType> extends Partial<EntityFilterState> {
	type: EntityFilterActionType | AcionType;
}

export interface EntityFilterStateManager extends EntityFilterState {
	setDisplayStartOrEndDate: (displayStartOrEndDate: DisplayStartOrEndDate) => void;
}

export type EntityFilterStateReducer<EFS extends EntityFilterState, EFA extends EntityFilterAction<any>> = (
	state: EFS,
	action: EFA
) => EFS;
