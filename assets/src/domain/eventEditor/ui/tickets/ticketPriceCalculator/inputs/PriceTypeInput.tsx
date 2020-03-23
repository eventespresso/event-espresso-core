import React from 'react';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';
import { usePriceTypes } from '@edtrServices/apollo/queries';
import { getPriceModifiers } from '@sharedEntities/priceTypes/predicates/selectionPredicates';

// just temporary
import styles from '../inlineStyles';

const PriceTypeInput: React.FC<PriceModifierProps> = ({ price }) => {
	const priceTypes = usePriceTypes();
	const modifierOptions = getPriceModifiers(priceTypes);
	const options = price.isBasePrice ? priceTypes : modifierOptions;
	return (
		<PriceField
			field='priceType'
			price={price}
			component={'select'}
			disabled={price.isBasePrice}
			style={styles.input}
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
