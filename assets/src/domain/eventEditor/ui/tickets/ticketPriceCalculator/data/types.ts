import { Reducer, ReducerState } from 'react';

import { EntityId } from '@appServices/apollo/types';
import { Ticket } from '@edtrServices/apollo';
import { BaseProps, TpcPriceModifier } from '../types';

export interface DataState {
	ticket: Partial<Ticket>;
	prices: Array<TpcPriceModifier>;
	deletedPrices: Array<EntityId>;
}

export type DataActionType =
	| 'UPDATE_TICKET_PRICE'
	| 'TOGGLE_REVERSE_CALCULATE'
	| 'ADD_PRICE'
	| 'UPDATE_PRICE'
	| 'DELETE_PRICE'
	| 'ADD_PRICE_TO_DELETED'
	| 'RESET';

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
	reset: VoidFunction;
	reverseCalculate: boolean;
	toggleCalcDir: VoidFunction;
	updatePrice: (args: UpdatePriceArgs) => void;
	addPrice: (price: TpcPriceModifier, index?: number) => void;
	deletePrice: (id: EntityId, isNew?: boolean) => void;
	updateTicketPrice: (ticketPrice: Ticket['price']) => void;
}

export type DataStateReducer = Reducer<DataState, DataAction>;

export type StateInitializer = (arg: DataState) => ReducerState<DataStateReducer>;
