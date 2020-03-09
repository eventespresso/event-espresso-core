import { getCurrencySignCharacterCountClassName, getCurrencySignPositionClassName } from './utils';
import { PriceType } from '@edtrServices/apollo/types';
import useConfig from '@appServices/config/useConfig';

const usePriceTypeHtmlClassName = (priceType: PriceType): string => {
	const config = useConfig();
	const sign = config?.currency?.sign;
	const signB4 = config?.currency?.signB4;
	const characters = getCurrencySignCharacterCountClassName(sign);
	const position = getCurrencySignPositionClassName(signB4);

	return priceType.isPercent ? `ee-percent-field${position}${characters}` : `ee-money-field${position}${characters}`;
};

export default usePriceTypeHtmlClassName;
