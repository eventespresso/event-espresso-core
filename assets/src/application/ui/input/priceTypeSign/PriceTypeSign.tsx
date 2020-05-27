import React from 'react';
import classNames from 'classnames';

import CurrencySign from './CurrencySign';
import { getCurrencySignCharacterCountClassName, getCurrencySignPositionClassName } from './utils';
import PercentSign from './PercentSign';
import { PriceType } from '@edtrServices/apollo/types';
import useConfig from '@appServices/config/useConfig';

type Props = {
	priceType: PriceType;
};

const PriceTypeSign: React.FC<Props> = ({ priceType }) => {
	const config = useConfig();
	const sign = config?.currency?.sign;
	const signB4 = config?.currency?.signB4;

	const currencySignPositionClassName = getCurrencySignPositionClassName(signB4);

	const className = classNames(currencySignPositionClassName);

	return priceType.isPercent ? <PercentSign className={className} /> : <CurrencySign sign={sign} />;
};

export default PriceTypeSign;
