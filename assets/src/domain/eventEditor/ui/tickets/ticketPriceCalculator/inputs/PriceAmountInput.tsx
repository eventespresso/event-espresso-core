import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { parsedAmount } from '@appServices/utilities/money';

import { PriceModifierProps } from '../types';
import { BaseNumberInputField, MoneyField, usePrice } from '../fields';
import { useDataState } from '../data';

import './styles.scss';

const PriceAmountInput: React.FC<PriceModifierProps> = ({ price }) => {
	const { reverseCalculate } = useDataState();
	const { getValue, setValue } = usePrice({ field: 'amount', price });

	const hasError = Number(price?.amount ?? 0) === 0;
	const className = classNames('ee-input__price-field', {
		'ee-input__price-field--has-error': hasError,
	});

	const disabled = (reverseCalculate && price.isBasePrice) || price.isDefault;

	const formatParse = (defaultValue = null) => (amount: any) => {
		const parsedValue = parsedAmount(amount);
		return isNaN(parsedValue) ? defaultValue : parsedValue;
	};

	const moneyFieldClassName = disabled && 'ee-input--disabled';

	return (
		<MoneyField className={moneyFieldClassName} isPercent={price.isPercent}>
			<BaseNumberInputField
				className={className}
				// because it can affect other tickets that have this price
				// default price amount should not be changeable
				disabled={disabled}
				format={formatParse('')}
				formatOnBlur
				getValue={getValue}
				name='amount'
				parse={formatParse()}
				placeholder={__('amount...')}
				setValue={setValue}
			/>
		</MoneyField>
	);
};

export default PriceAmountInput;
