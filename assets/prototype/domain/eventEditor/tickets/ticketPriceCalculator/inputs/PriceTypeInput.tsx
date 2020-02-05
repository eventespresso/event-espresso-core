import React from 'react';
import { Field } from 'react-final-form';

// just temporary
import styles from '../inlineStyles';
import { Price, PriceType } from '../../../data/types';
import usePriceTypeForPrice from '../../../data/queries/priceTypes/usePriceTypeForPrice';

interface PriceTypeInputProps {
	name: string;
	price: Price;
	priceTypes: PriceType[];
	modifierOptions: PriceType[];
}

const PriceTypeInput: React.FC<PriceTypeInputProps> = ({ name, price, priceTypes, modifierOptions }): JSX.Element => {
	const relatedPriceType = usePriceTypeForPrice(price.id);
	const options = price.isBasePrice ? priceTypes : modifierOptions;
	return (
		<Field
			component={'select'}
			initialValue={relatedPriceType.id}
			name={`${name}.priceType`}
			disabled={price.isBasePrice}
			style={styles.input}
		>
			{options.map(
				(option: PriceType): JSX.Element => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				)
			)}
		</Field>
	);
};

export default PriceTypeInput;
