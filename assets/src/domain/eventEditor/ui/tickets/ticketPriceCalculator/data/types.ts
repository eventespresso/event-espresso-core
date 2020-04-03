import { Reducer, ReducerState } from 'react';

import { EntityId } from '@appServices/apollo/types';
import { Ticket } from '@edtrServices/apollo';
import { BaseProps, TpcPriceModifier } from '../types';

export interface DataState extends Prices {
	ticket: Partial<Ticket>;
	deletedPrices: Array<EntityId>;
}

export type DataActionType =
	| 'ADD_PRICE'
	| 'ADD_PRICE_TO_DELETED'
	| 'DELETE_PRICE'
	| 'RESET'
	| 'SET_PRICES'
	| 'TOGGLE_CALC_DIR'
	| 'UPDATE_PRICE'
	| 'UPDATE_TICKET_PRICE';

export interface DataAction extends Partial<DataState>, Partial<UpdatePriceArgs> {
	type: DataActionType;
	ticketPrice?: Ticket['price'];
	price?: TpcPriceModifier;
	index?: number;
}

export type DataStateManagerHook = (props: BaseProps) => DataStateManager;

interface UpdatePriceArgs {
	id: EntityId;
	fieldValues: Partial<TpcPriceModifier>;
}

export interface DataStateManager extends DataState {
	addPrice: (price: TpcPriceModifier, index?: number) => void;
	deletePrice: (id: EntityId, isNew?: boolean) => void;
	getData: () => DataState;
	reset: VoidFunction;
	reverseCalculate: boolean;
	setPrices: (prices: DataState['prices']) => void;
	toggleCalcDir: VoidFunction;
	updatePrice: (args: UpdatePriceArgs) => void;
	updateTicketPrice: (ticketPrice: Ticket['price']) => void;
}

export type DataStateReducer = Reducer<DataState, DataAction>;

export interface Prices {
	prices: Array<TpcPriceModifier>;
}

export type StateInitializer = (arg: DataState) => ReducerState<DataStateReducer>;

export interface TableProps extends Prices {}
