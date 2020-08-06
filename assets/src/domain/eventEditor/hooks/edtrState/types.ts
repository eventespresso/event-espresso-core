import type { Reducer } from 'react';

import type { EntityId } from '@dataServices/types';

export type BasicSortBy = 'name' | 'id';

export interface EdtrState {
	visibleDatetimeIds: Array<EntityId>;
}

export type EdtrActionType = 'SET_VISIBLE_DATETIME_IDS';

export interface EdtrAction extends Partial<EdtrState> {
	type: EdtrActionType;
}

export interface EdtrStateManager extends EdtrState {
	getState: () => EdtrState;
	setVisibleDatetimeIds: (visibleDatetimeIds: Array<EntityId>) => void;
}

export type EdtrStateReducer = Reducer<EdtrState, EdtrAction>;
