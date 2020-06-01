import React from 'react';
import classNames from 'classnames';

import { CurrencySign, PercentSign, getCurrencySignCharacterCountClassName } from '@appInputs/priceTypeSign';
import InputWithLabel from '@appInputs/InputWithLabel';
import { MoneyFieldProps } from './types';

import useConfig from '@appServices/config/useConfig';
import './style.scss';

const MoneyField: React.FC<MoneyFieldProps> = ({ children, isPercent = false, ...props }) => {
	const config = useConfig();
	const currency = props.currency ?? config?.currency;

	const sign = currency?.sign;
	const signB4 = currency?.signB4;

	const characters = getCurrencySignCharacterCountClassName(sign);

	const label = isPercent ? (
		<PercentSign className='ee-money-field__label' />
	) : (
		<CurrencySign className='ee-money-field__label' sign={sign} />
	);
	const isLeftPositioned = signB4 && !isPercent;
	const labelPosition = isLeftPositioned ? 'left' : 'right';

	const className = classNames(
		props.className,
		characters,
		isPercent && 'ee-money-field--with-percent-sign',
		!isPercent && 'ee-money-field--with-currency-sign',
		`ee-money-field-sign--${signB4 ? 'before' : 'after'}`,
		'ee-money-field'
	);

	return (
		<div className={className}>
			<InputWithLabel label={label} labelPosition={labelPosition}>
				{children}
			</InputWithLabel>
		</div>
	);
};

export default React.memo(MoneyField);
