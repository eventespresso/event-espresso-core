import React from 'react';
import { Field } from 'react-final-form';

// just temporary
import styles from './inlineStyles';
import { Price } from '../../data/types';
import { useMoneyDisplay } from '../../../../application/utilities/money';
const percentSign = '%';

interface PriceAmountInputProps {
	name: string;
	price: Price;
	reverseCalculate: boolean;
}

const PriceAmountInput: React.FC<PriceAmountInputProps> = ({ name, price, reverseCalculate }): JSX.Element => {
	const { currency, formatAmount } = useMoneyDisplay();
	const sign = price.isPercent ? percentSign : currency.sign;
	let b4Price = '';
	let afterPrice = sign;
	// isPercent T  currencySignB4 T  sign appears  afterPrice
	// isPercent T  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 F  sign appears  afterPrice
	// isPercent F  currencySignB4 T  sign appears  b4Price
	if (currency.signB4 && !price.isPercent) {
		b4Price = sign;
		afterPrice = '';
	}
	return (
		<div style={styles.money}>
			<div style={styles.b4}>{b4Price}</div>
			<div style={styles.currency}>
				<Field
					type={'number'}
					component={'input'}
					initialValue={price.amount}
					name={`${name}.amount`}
					placeholder={'amount...'}
					style={styles.number}
					disabled={reverseCalculate && price.isBasePrice}
					format={formatAmount}
					formatOnBlur
				/>
			</div>
			<div style={styles.aft}>{afterPrice}</div>
		</div>
	);
};

export default PriceAmountInput;
