import React from 'react';

import AddPriceModifierButton from './AddPriceModifierButtonData';
import DeletePriceModifierButton from './DeletePriceModifierButton';
import { TpcModifierFormRowProps } from '../types';

const PriceModifierActions: React.FC<TpcModifierFormRowProps> = ({
	index,
	name,
	price,
	fields: { push, remove, reset, sort },
}) => {
	const actions = [];
	const key = `${price.id}-${index}`;
	if (price.id === 'NEW_PRICE') {
		actions.push(
			<AddPriceModifierButton key={key} name={name} price={price} push={push} reset={reset} sort={sort} />
		);
	} else if (!price.isBasePrice) {
		actions.push(<DeletePriceModifierButton key={key} index={index} remove={remove} />);
	}
	return <>{actions}</>;
};
export default PriceModifierActions;
