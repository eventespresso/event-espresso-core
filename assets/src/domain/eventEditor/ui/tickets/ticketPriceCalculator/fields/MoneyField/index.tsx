import React from 'react';

import { MoneyFieldProps } from './types';

import { CurrencySign, PercentSign } from '@appInputs/priceTypeSign';

import useConfig from '@appServices/config/useConfig';
import './style.scss';

const MoneyField: React.FC<MoneyFieldProps> = ({ children, isPercent = false, ...props }) => {
	const config = useConfig();
	const currency = props.currency ?? config?.currency;

	const sign = currency?.sign;
	const signB4 = currency?.signB4;

	const beforeContent = signB4 && !isPercent && (
		<div className='ee-money-field__before'>
			<CurrencySign sign={sign} />
		</div>
	);

	const afterClassName = 'ee-money-field__after';
	const afterContent = isPercent ? (
		<PercentSign className={afterClassName} />
	) : (
		!signB4 && <CurrencySign className={afterClassName} sign={sign} />
	);

	return (
		<div className='ee-money-field'>
			{beforeContent}
			{children}
			{afterContent}
		</div>
	);
};

export default React.memo(MoneyField);
