/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const EMPTY_OBJECT = {};

/**
 * withEventDatetimes
 * returns an object containing the following:
 *    eventDates - an array of datetime entities for the supplied event
 *    eventDatesLoaded - boolean true if loading is complete
 *
 * !!! IMPORTANT !!!
 * ONLY USE THIS AFTER THE CALL TO hasFinishedResolution() in the
 * withEvent() DATA HOC has completed and resolved true
 *
 * @function
 */
export const withEventDatetimes = withSelect(
	( select, ownProps ) => {
		const { event, eventLoaded } = ownProps;
		if ( eventLoaded && isModelEntityOfModel( event, 'event' ) ) {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			const eventDates = getRelatedEntities( event, 'datetimes' );
			const eventDatesLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ event, 'datetimes' ]
			);
			if ( eventDatesLoaded ) {
				return { eventDates, eventDatesLoaded };
			}
		}
		return EMPTY_OBJECT;
	}
);
