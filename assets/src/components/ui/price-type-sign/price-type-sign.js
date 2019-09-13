import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

import CurrencySign from './currency-sign';
import PercentSign from './percent-sign';

/**
 * @param {BaseEntity} priceType
 * @return {Object} % or $ sign
 */
const PriceTypeSign = ( { priceType } ) => {
	const isPercent = isModelEntityOfModel( priceType, 'price_type' ) ?
		priceType.isPercent :
		false;
	return useMemo(
		() => isPercent ? <PercentSign /> : <CurrencySign />,
		[ isPercent ]
	);
};

export default PriceTypeSign;
