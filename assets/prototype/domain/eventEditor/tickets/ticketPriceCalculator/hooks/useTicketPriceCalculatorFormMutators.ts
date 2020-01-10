import { Mutator, MutableState, Tools } from 'final-form';
import arrayMutators from 'final-form-arrays';
import propOr from 'ramda/src/propOr';

import { TpcFormData } from '../types';
import { sortByPriceOrderIdAsc } from '../../../../shared/predicates/prices/sortingPredicates';

interface TpcFormMutators {
	[key: string]: Mutator<TpcFormData>;
}

const useTicketPriceCalculatorFormMutators = (): TpcFormMutators => {
	return {
		...arrayMutators,
		toggleCalcDir: (args: any[], state: MutableState<TpcFormData>, tools: Tools<TpcFormData>) => {
			tools.changeValue(state, 'ticket.reverseCalculate', (value) => !value);
		},
		reset: (args: any[], state: MutableState<TpcFormData>, tools: Tools<TpcFormData>) => {
			const path = typeof args[1] === 'string' ? args[1] : null;
			if (path) {
				const fields = ['priceType', 'name', 'desc', 'amount'];
				fields.forEach((field) => {
					const fieldName = `${path}.${field}`;
					const initialValue = tools.getIn(state, `formState.initialValues.${fieldName}`) || null;
					tools.resetFieldState(fieldName);
					tools.changeValue(state, fieldName, () => initialValue);
				});
			}
		},
		sort: (args: any[], state: MutableState<TpcFormData>, tools: Tools<TpcFormData>) => {
			const prices = tools.getIn(state, 'formState.values.prices') || [];
			const sortedPrices = sortByPriceOrderIdAsc(prices);
			const newState = tools.setIn(state, 'formState.values.prices', sortedPrices);
			Object.assign(state, newState);
		},
	};
};

export default useTicketPriceCalculatorFormMutators;
