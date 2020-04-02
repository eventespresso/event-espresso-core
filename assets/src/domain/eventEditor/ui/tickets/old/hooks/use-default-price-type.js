/**
 * External imports
 */
import { filter, first } from 'lodash';
import { useMemo } from '@wordpress/element';
import { usePriceTypes } from '@eventespresso/hooks';

const useDefaultPriceType = () => {
	const { priceTypes } = usePriceTypes();
	return useMemo( () => first(
		filter( priceTypes, ( priceType ) => priceType.id !== 1 )
	), [ priceTypes ] );
};

export default useDefaultPriceType;
