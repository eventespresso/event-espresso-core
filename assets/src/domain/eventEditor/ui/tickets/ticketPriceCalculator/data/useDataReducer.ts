import { append, findIndex, insert, propEq, update } from 'ramda';

import { DataStateReducer, StateInitializer, DataState } from './types';

export const initialState: DataState = {
	ticket: null,
	prices: [],
	deletedPrices: [],
};

const useDataReducer = (initializer: StateInitializer): DataStateReducer => {
	const dataReducer: DataStateReducer = (state, action) => {
		const { type, id, index, fieldValues, ticketPrice, price } = action;

		switch (type) {
			case 'TOGGLE_REVERSE_CALCULATE':
				return {
					...state,
					ticket: {
						...state.ticket,
						reverseCalculate: !state.ticket.reverseCalculate,
					},
				};
			case 'UPDATE_TICKET_PRICE':
				return {
					...state,
					ticket: {
						...state.ticket,
						price: ticketPrice,
					},
				};

			case 'ADD_PRICE':
				const newPrices =
					typeof index !== 'undefined' ? insert(index, price, state.prices) : append(price, state.prices);
				return {
					...state,
					prices: newPrices,
				};

			case 'UPDATE_PRICE':
				// find the index of the price to update
				const priceIndex = findIndex(propEq('id', id), state.prices);
				// if price id does not exist
				if (priceIndex < 0) {
					return state;
				}
				// get the price object
				const priceToUpdate = state.prices[priceIndex];
				// update the prices list
				const prices = update<typeof state.prices[0]>(
					priceIndex,
					{ ...priceToUpdate, ...fieldValues },
					state.prices
				);
				return priceIndex > -1
					? {
							...state,
							prices,
					  }
					: state;

			case 'DELETE_PRICE':
				return {
					...state,
					prices: state.prices.filter(({ id: priceId }) => id !== priceId),
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
