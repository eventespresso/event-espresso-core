/**
 * External dependencies
 */
import { find } from 'lodash';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import usePriceTypes from './use-price-types';

const useBasePriceType = () => {
	const { priceTypes, priceTypesLoaded } = usePriceTypes();
	return useMemo(
		() => {
			if ( ! priceTypesLoaded ) {
				return null;
			}
			return find(
				priceTypes,
				( priceType ) => priceType.pbtId === 1
			);
		},
		[ priceTypes, priceTypesLoaded ]
	);
};

export default useBasePriceType;
