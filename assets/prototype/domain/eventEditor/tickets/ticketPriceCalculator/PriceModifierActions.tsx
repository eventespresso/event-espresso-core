import React from 'react';

import AddPriceModifierButton from './AddPriceModifierButton';
import DeletePriceModifierButton from './DeletePriceModifierButton';

import { Price } from '../../data/types';
import { TicketPriceCalculatorMutators } from './types';

interface PriceModifierActionsProps {
	index: number;
	name: string;
	price: Price;
	modifierOptions: Price[];
	fields: TicketPriceCalculatorMutators;
}

const PriceModifierActions = ({
	index,
	name,
	price,
	modifierOptions,
	fields: { push, remove, reset, sort },
}: PriceModifierActionsProps): React.ReactNode => {
	const actions = [];
	if (price.id === 'NEW_PRICE') {
		actions.push(
			<AddPriceModifierButton
				key={`${price.id}-${index}`}
				modifiers={modifierOptions}
				name={name}
				price={price}
				push={push}
				reset={reset}
				sort={sort}
			/>
		);
	} else if (!price.isBasePrice) {
		actions.push(<DeletePriceModifierButton key={index} index={index} remove={remove} />);
	}
	return <>{actions}</>;
};
export default PriceModifierActions;
