import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';
import {
	currencySignCharacterCount,
	currencySignPositionClass,
} from './currency-sign-utils';

/**
 * @param {BaseEntity} priceType
 * @return {string} css class for % or $ sign
 */
const usePriceTypeHtmlClass = ( priceType = null ) => {
	const isPercent = isModelEntityOfModel( priceType, 'price_type' ) ?
		priceType.isPercent :
		false;
	return useMemo( () => {
		const position = currencySignPositionClass();
		const characters = currencySignCharacterCount();
		return isPercent ?
			`ee-percent-field${ position }${ characters }` :
			`ee-money-field${ position }${ characters }`;
	}, [ isPercent ] );
};

export default usePriceTypeHtmlClass;
