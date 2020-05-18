import { any, append, findIndex, insert, update } from 'ramda';

import { DataStateReducer, StateInitializer, DataState } from './types';
import { entityHasGuid } from '@sharedServices/predicates/selectionById';
import { isTax } from '@sharedEntities/prices/predicates/selectionPredicates';

export const initialState: DataState = {
	ticket: null,
	prices: [],
	deletedPrices: [],
};

const useDataReducer = (initializer: StateInitializer): DataStateReducer => {
	const dataReducer: DataStateReducer = (state, action) => {
		const { type, id, index, fieldValues, ticketPrice, price, prices } = action;
		let isTaxable: boolean;

		switch (type) {
			case 'TOGGLE_CALC_DIR':
				return {
					...state,
					ticket: {
						...state.ticket,
						reverseCalculate: !state.ticket?.reverseCalculate,
					},
				};
			case 'UPDATE_TICKET_PRICE':
				isTaxable = any(isTax, state.prices);
				return {
					...state,
					ticket: {
						...state.ticket,
						price: ticketPrice,
						isTaxable,
					},
				};
			case 'SET_PRICES':
				return {
					...state,
					prices,
				};

			case 'ADD_PRICE':
				let newPrices =
					typeof index !== 'undefined' ? insert(index, price, state.prices) : append(price, state.prices);
				newPrices = newPrices.map((newPrice, index) => {
					// order of base price is <= 1
					if (!newPrice.isBasePrice) {
						const order = (index + 1) * 10; // steps of 10, +1 to avoid 0 order
						return { ...newPrice, order };
					}
					return newPrice;
				});
				return {
					...state,
					prices: newPrices,
				};

			case 'UPDATE_PRICE':
				// find the index of the price to update
				const priceIndex = findIndex(entityHasGuid(id), state.prices);
				// if price id does not exist
				if (priceIndex < 0) {
					return state;
				}
				// get the price object
				const priceToUpdate = state.prices[priceIndex];

				// update the price object
				const updatedPrice = { ...priceToUpdate, ...fieldValues, isModified: true };

				// update the prices list
				const updatedPrices = update<typeof state.prices[0]>(priceIndex, updatedPrice, state.prices);
				isTaxable = any(isTax, updatedPrices);
				return priceIndex > -1
					? {
							...state,
							prices: updatedPrices,
							ticket: {
								...state.ticket,
								isTaxable,
							}
					  }
					: state;

			case 'DELETE_PRICE':
				const retainedPrices = state.prices.filter(({ id: priceId }) => id !== priceId);
				isTaxable = any(isTax, retainedPrices);
				return {
					...state,
					prices: retainedPrices,
					ticket: {
						...state.ticket,
						isTaxable,
					}
				};

			case 'ADD_PRICE_TO_DELETED':
				if (state.deletedPrices.includes(id)) {
					return state;
				}
				return {
					...state,
					deletedPrices: [...state.deletedPrices, id],
				};
			case 'RESET':
				return initializer(initialState);

			default:
				throw new Error('Unexpected action');
		}
	};

	return dataReducer;
};

export default useDataReducer;
