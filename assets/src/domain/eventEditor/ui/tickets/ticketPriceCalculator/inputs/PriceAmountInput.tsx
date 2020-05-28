import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { MoneyField, PriceField } from '../fields';
import { parsedAmount } from '@appServices/utilities/money';
import { useDataState } from '../data';

import './styles.scss';

const PriceAmountInput: React.FC<PriceModifierProps> = ({ price }) => {
	const { reverseCalculate } = useDataState();

	const hasError = Number(price?.amount ?? 0) === 0;
	const className = classNames('ee-input__price-field', {
		'ee-input__price-field--has-error': hasError,
	});

	const disabled = (reverseCalculate && price.isBasePrice) || price.isDefault;

	const formatParse = (defaultValue = null) => (amount: any) => {
		const parsedValue = parsedAmount(amount);
		return isNaN(parsedValue) ? defaultValue : parsedValue;
	};

	return (
		<MoneyField isPercent={price.isPercent}>
			<PriceField
				className={className}
				component='input'
				// because it can affect other tickets that have this price
				// default price amount should not be changeable
				disabled={disabled}
				field='amount'
				format={formatParse('')}
				formatOnBlur
				parse={formatParse()}
				placeholder={__('amount...')}
				price={price}
				type='number'
			/>
		</MoneyField>
	);
};

export default PriceAmountInput;
