/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const DEFAULT_OBJECT = {
	dateEntities: [],
};

/**
 * withEditorTicketDateEntities
 * returns an object containing the following:
 *    dateEntities - an array of datetime entities for the supplied ticket
 *
 * @function
 */
const withEditorTicketDateEntities = createHigherOrderComponent(
	withSelect(
		( select, { ticketEntity } ) => {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
				const dateEntities = getRelatedEntities( ticketEntity, 'datetime' );
				return { dateEntities };
			}
			return DEFAULT_OBJECT;
		}
	),
	'withEditorTicketDateEntities'
);

export default withEditorTicketDateEntities;
