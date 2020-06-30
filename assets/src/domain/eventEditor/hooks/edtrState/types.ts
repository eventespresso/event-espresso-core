import type { Reducer } from 'react';

import type { EntityId } from '@dataServices/types';

export type BasicSortBy = 'name' | 'id';

export interface EdtrState {
	visibleDatetimeIds: Array<EntityId>;
	pricesPollInterval: number; // interval in ms at which the prices should be refetched
}

export type EdtrActionType = 'SET_VISIBLE_DATETIME_IDS' | 'SET_PRICES_POLL_INTERVAL';

export interface EdtrAction extends Partial<EdtrState> {
	type: EdtrActionType;
}

export interface EdtrStateManager extends EdtrState {
	getState: () => EdtrState;
	setVisibleDatetimeIds: (visibleDatetimeIds: Array<EntityId>) => void;
	setPricesPollInterval: (interval: number) => void;
}

export type EdtrStateReducer = Reducer<EdtrState, EdtrAction>;
