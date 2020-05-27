import React from 'react';
import classNames from 'classnames';

import { getCurrencySignCharacterCountClassName } from './utils';

interface Props {
	className?: string;
	sign: string;
}

const CurrencySign: React.FC<Props> = ({ sign, ...props }) => {
	const currencySignCharacterCountClassName = getCurrencySignCharacterCountClassName(sign);
	const className = classNames(props.className, currencySignCharacterCountClassName, 'ee-currency-sign');

	return <div className={className}>{sign}</div>;
};

export default CurrencySign;
