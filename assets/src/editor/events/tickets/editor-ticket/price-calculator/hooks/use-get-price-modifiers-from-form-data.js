/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import getPrice from '../utils/get-price';

/**
 * @function
 * @param {BaseEntity[]} prices,
 * @return {Function} callback for retrieving price modifiers from form data
 */
const useGetPriceModifiersFromFormData = ( prices ) => useCallback(
	( formData ) => {
		const priceIDs = formData.priceIDs ? formData.priceIDs.split( ',' ) : [];
		return priceIDs.map(
			( priceID ) => getPrice( priceID, prices )
		).filter(
			( price ) => isModelEntityOfModel( price, 'price' )
		);
	},
	[ prices ]
);

export default useGetPriceModifiersFromFormData;
