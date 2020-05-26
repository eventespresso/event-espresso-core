import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { PriceField, TicketPriceField } from '../fields';
import { useMoneyDisplay, parsedAmount, formatAmount } from '@appServices/utilities/money';
import { useDataState } from '../data';

import './styles.scss';

const percentSign = '%';

const PriceAmountInput: React.FC<PriceModifierProps> = ({ price }) => {
	const { reverseCalculate } = useDataState();
	const { currency } = useMoneyDisplay();
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

	const className = classNames('ee-input__price-field', {
		'ee-input__price-field--has-error': Number(price?.amount ?? 0) === 0,
	});

	const formatParse = (defaultValue = null) => (amount: any) => {
		const parsedValue = parsedAmount(amount);
		return isNaN(parsedValue) ? defaultValue : parsedValue;
	};

	const field = (
		<PriceField
			className={className}
			component={'input'}
			// because it can affect other tickets that have this price
			// default price amount should not be changeable
			disabled={(reverseCalculate && price.isBasePrice) || price.isDefault}
			field='amount'
			format={formatParse('')}
			formatOnBlur
			parse={formatParse()}
			placeholder={__('amount...')}
			price={price}
			type={'number'}
		/>
	);

	return <TicketPriceField after={afterPrice} before={b4Price} field={field} />;
};

export default PriceAmountInput;
