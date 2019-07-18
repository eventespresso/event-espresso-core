/**
 * External imports
 */
import { useSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * withPriceTypeEntities
 * injects the following additional props into the provided component:
 *    priceTypeEntities - an array of price_type entities
 *    priceTypeEntitiesLoaded - boolean true if loading is complete
 *
 * @function
 */
export default createHigherOrderComponent(
	( WrappedComponent ) => ( { ...otherProps } ) => {
		const { priceTypeEntities, priceTypeEntitiesLoaded } = useSelect(
			( select ) => {
				const { getEntities } = select( 'eventespresso/lists' );
				const { hasFinishedResolution } = select( 'core/data' );
				const prices = getEntities( 'price_type' );
				const pricesLoaded = hasFinishedResolution(
					'eventespresso/lists',
					'getEntities',
					[ 'price_type' ]
				);
				return {
					priceTypeEntities: prices,
					priceTypeEntitiesLoaded: pricesLoaded,
				};
			},
			[]
		);
		return <WrappedComponent
			{ ...otherProps }
			priceTypeEntities={ priceTypeEntities }
			priceTypeEntitiesLoaded={ priceTypeEntitiesLoaded }
		/>;
	},
	'withPriceTypeEntities'
);
