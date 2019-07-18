/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const EMPTY_OBJECT = {
	noBasePrice: true,
	priceEntitiesLoaded: false,
	priceEntities: [],
};

/**
 * withTicketPriceEntities
 * injects the following additional props into the provided component:
 *    priceEntities - an array of price entities for the supplied ticket
 *    priceEntitiesLoaded - boolean true if loading is complete
 *    noBasePrice - boolean true if loading is complete but priceEntities is empty
 */
export default createHigherOrderComponent(
	( WrappedComponent ) => ( {
		ticketEntity,
		...otherProps
	} ) => {
		const { noBasePrice, priceEntitiesLoaded, priceEntities } = useSelect(
			( select ) => {
				if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
					const { getRelatedEntities } = select( 'eventespresso/core' );
					const { hasFinishedResolution } = select( 'core/data' );
					const prices = getRelatedEntities(
						ticketEntity,
						'price'
					);
					const pricesLoaded = hasFinishedResolution(
						'eventespresso/core',
						'getRelatedEntities',
						[ ticketEntity, 'price' ]
					);
					if ( pricesLoaded ) {
						return {
							noBasePrice: isEmpty( priceEntities ),
							priceEntitiesLoaded: pricesLoaded,
							priceEntities: prices,
						};
					}
				}
				return EMPTY_OBJECT;
			},
			[ ticketEntity ]
		);
		return <WrappedComponent
			{ ...otherProps }
			ticketEntity={ ticketEntity }
			priceEntities={ priceEntities }
			priceEntitiesLoaded={ priceEntitiesLoaded }
			noBasePrice={ noBasePrice }
		/>;
	},
	'withTicketPriceEntities'
);
