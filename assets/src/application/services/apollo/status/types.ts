export enum TypeName {
	datetimes = 'datetimes',
	tickets = 'tickets',
	priceTypes = 'priceTypes',
	prices = 'prices',
}

export type StatusGetter = (entity: TypeName) => boolean;

export type StatusSetter = (entity: TypeName, value: boolean) => void;

export interface StatusFlags {
	datetimes: boolean;
	tickets: boolean;
	priceTypes: boolean;
	prices: boolean;
}

export interface StatusState {
	loading: StatusFlags;
	completed: StatusFlags;
	error: StatusFlags;
}

export interface StatusAction {
	type: 'SET_IS_LOADING' | 'SET_IS_LOADED' | 'SET_IS_ERROR';
	typeName: TypeName;
	value: boolean;
}

export interface StatusManager {
	isLoading: StatusGetter;
	setIsLoading: StatusSetter;
	isLoaded: StatusGetter;
	setIsLoaded: StatusSetter;
	isError: StatusGetter;
	setIsError: StatusSetter;
}
