import React from 'react';
import classNames from 'classnames';

import { CurrencySign, PercentSign } from '@appInputs/priceTypeSign';
import { MoneyFieldProps } from './types';

import updateInputsSizesAndAlign from './updateInputsSizes';
import useConfig from '@appServices/config/useConfig';
import './style.scss';

const MoneyField: React.FC<MoneyFieldProps> = ({ children, isPercent = false, ...props }) => {
	const config = useConfig();
	const currency = props.currency ?? config?.currency;

	const sign = currency?.sign;
	const signB4 = currency?.signB4;

	updateInputsSizesAndAlign({ isPercent, signB4 });

	const beforeContent = signB4 && !isPercent && (
		<div className='ee-money-field__label ee-money-field__before'>
			<CurrencySign sign={sign} />
		</div>
	);

	const afterClassName = 'ee-money-field__label ee-money-field__after';
	const afterContent = isPercent ? (
		<PercentSign className={afterClassName} />
	) : (
		!signB4 && <CurrencySign className={afterClassName} sign={sign} />
	);

	const labelPositionClassName = classNames({ left: signB4 && !isPercent, right: isPercent || !signB4 });

	const className = classNames(
		isPercent && 'ee-money-field--with-percent-sign',
		!isPercent && 'ee-money-field--with-currency-sign',
		`ee-money-field--label-${labelPositionClassName}`,
		`ee-money-field--sign-${signB4 ? 'before' : 'after'}`,
		'ee-money-field'
	);

	return (
		<div className={className}>
			{beforeContent}
			{children}
			{afterContent}
		</div>
	);
};

export default React.memo(MoneyField);
