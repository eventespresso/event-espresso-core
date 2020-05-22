import React from 'react';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';
import { usePriceTypes } from '@edtrServices/apollo/queries';
import { getPriceModifiers } from '@sharedEntities/priceTypes/predicates/selectionPredicates';

const PriceTypeInput: React.FC<PriceModifierProps> = ({ price }) => {
	const priceTypes = usePriceTypes();
	const modifierOptions = getPriceModifiers(priceTypes);
	const options = price.isBasePrice ? priceTypes : modifierOptions;

	return (
		<PriceField
			component={'select'}
			// price type cannot be changed for base/default price
			disabled={price.isBasePrice || price.isDefault}
			field='priceType'
			price={price}
		>
			{options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.name}
				</option>
			))}
		</PriceField>
	);
};

export default PriceTypeInput;
