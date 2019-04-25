/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * withSelectTicketPricesAndPriceTypes
 */
export default withSelect( ( select, ownProps ) => {
	const { getRelatedEntities } = select( 'eventespresso/core' );
	const { getEntities } = select( 'eventespresso/lists' );
	const { hasFinishedResolution } = select( 'core/data' );
	const ticket = ownProps.ticket;
	let prices = DEFAULT_EMPTY_ARRAY;
	if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
		prices = getRelatedEntities( ticket, 'prices' );
	}
	const priceTypes = getEntities( 'price_type' );
	const pricesResolved = hasFinishedResolution(
		'eventespresso/core',
		'getRelatedEntities',
		[ ticket, 'prices' ]
	);
	const priceTypesResolved = hasFinishedResolution(
		'eventespresso/lists',
		'getEntities',
		[ 'price_type' ]
	);
	return pricesResolved && priceTypesResolved ? {
		loading: false,
		ticket,
		prices,
		priceTypes,
	} : {
		loading: true,
		ticket,
		prices: [],
		priceTypes: [],
	};
} );
