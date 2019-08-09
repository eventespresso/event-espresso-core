/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * creates an array of price type options for use in a form select input
 * where keys are the price type ID and values are the price type name
 *
 * @function
 * @param {Array} priceTypes
 * @return {Array} price type options for use in select input
 */
const useBuildSelectInputOptionsForPriceTypes = ( priceTypes ) => useMemo(
	() => {
		const priceTypeOptions = [];
		for ( let i = 0; i < priceTypes.length; i++ ) {
			const priceType = priceTypes[ i ];
			if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
				priceTypeOptions.push( {
					value: priceType.id,
					label: priceType.name,
				} );
			}
		}
		return priceTypeOptions;
	},
	[ priceTypes ]
);

export default useBuildSelectInputOptionsForPriceTypes;
