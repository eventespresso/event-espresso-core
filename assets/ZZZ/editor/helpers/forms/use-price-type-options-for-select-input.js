/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { usePriceTypes } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

const chooseOption = {
	value: 0,
	label: __( '- select type -', 'event_espresso' ),
};

const EMPTY_ARRAY = [];
/**
 * creates an array of price type options for use in a form select input
 * where values are the price type ID and labels are the price type name
 *
 * @function
 * @param {Array} removeTypes
 * @return {Array} price type options for use in select input
 */
const usePriceTypeOptionsForSelectInput = ( removeTypes = EMPTY_ARRAY ) => {
	const { priceTypes, priceTypesLoaded } = usePriceTypes();
	return useMemo( () => {
		if ( ! priceTypesLoaded ) {
			return EMPTY_ARRAY;
		}
		const priceTypeOptions = [ chooseOption ];
		const filteredPriceTypeOptions = [ chooseOption ];
		for ( let i = 0; i < priceTypes.length; i++ ) {
			const priceType = priceTypes[ i ];
			if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
				priceTypeOptions.push( {
					value: priceType.id,
					label: priceType.name,
				} );
				if ( ! removeTypes.includes( priceType.PBT_ID ) ) {
					filteredPriceTypeOptions.push( {
						value: priceType.id,
						label: priceType.name,
					} );
				}
			}
		}
		return {
			priceTypeOptions,
			filteredPriceTypeOptions,
		};
	}, [ priceTypes, priceTypesLoaded, removeTypes ] );
};

export default usePriceTypeOptionsForSelectInput;
