import { BasicSortBy } from '@appLayout/entityList/filterBar';

export type SortBy = BasicSortBy | 'date' | 'order';

export enum DateToDisplay {
	start = 'start',
	end = 'end',
	both = 'both',
}

export interface EntityFilterState {
	dateToDisplay?: DateToDisplay;
}

export type EntityFilterActionType = 'SET_DATE_TO_DISPLAY';

export interface EntityFilterAction<AcionType> extends Partial<EntityFilterState> {
	type: EntityFilterActionType | AcionType;
}

export interface EntityFilterStateManager extends EntityFilterState {
	setDateToDisplay: (dateToDisplay: DateToDisplay) => void;
}

export type EntityFilterStateReducer<EFS extends EntityFilterState, EFA extends EntityFilterAction<any>> = (
	state: EFS,
	action: EFA
) => EFS;
