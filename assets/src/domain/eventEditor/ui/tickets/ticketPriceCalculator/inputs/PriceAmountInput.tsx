import React from 'react';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';
import { useMoneyDisplay, parsedAmount } from '@appServices/utilities/money';
import { useDataState } from '../data';

// just temporary
import styles from '../inlineStyles';
const percentSign = '%';

const PriceAmountInput: React.FC<PriceModifierProps> = ({ price }) => {
	const { reverseCalculate } = useDataState();
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
				<PriceField
					field='amount'
					price={price}
					type={'number'}
					component={'input'}
					placeholder={__('amount...')}
					style={styles.number}
					disabled={reverseCalculate && price.isBasePrice}
					format={(amount) => formatAmount(amount) || ''}
					parse={(amount) => {
						const parsedValue = parsedAmount(amount);
						return isNaN(parsedValue) ? null : parsedValue;
					}}
					formatOnBlur
				/>
			</div>
			<div style={styles.aft}>{afterPrice}</div>
		</div>
	);
};

export default PriceAmountInput;
