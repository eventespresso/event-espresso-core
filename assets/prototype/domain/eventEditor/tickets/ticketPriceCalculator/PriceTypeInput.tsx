import React from 'react';
import { Field } from 'react-final-form';

// just temporary
import styles from './inlineStyles';
import { Price } from '../../data/types';
import usePriceTypeForPrice from '../../data/queries/priceTypes/usePriceTypeForPrice';

interface PriceTypeInputProps {
	name: string;
	price: Price;
	priceTypes: Price[];
	modifierOptions: Price[];
}

const PriceTypeInput: React.FunctionComponent<PriceTypeInputProps> = ({ name, price, priceTypes, modifierOptions }) => {
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
				(option: Price): React.ReactNode => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				)
			)}
		</Field>
	);
};

export default PriceTypeInput;
