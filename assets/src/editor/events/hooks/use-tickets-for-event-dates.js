/**
 * External imports.
 */
import { isEmpty } from 'lodash';
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT = {
	ticketEntities: [],
	ticketEntitiesLoaded: false,
};

/**
 * A custom react hook for retrieving the related ticket entities
 * for the given event date entities from the eventespresso/core store state.
 *
 * @param {BaseEntity[]} dateEntities  array of event date entities.
 * @param {boolean} dateEntitiesLoaded  true if all event dates are loaded
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */
const useTicketsForEventDates = (
	dateEntities = [],
	dateEntitiesLoaded = true
) => {
	return useSelect( ( select ) => {
		if (
			! dateEntitiesLoaded ||
			! Array.isArray( dateEntities ) ||
			isEmpty( dateEntities )
		) {
			return DEFAULT;
		}
		const dateEntityIds = dateEntities.map(
			( dateEntity ) => isModelEntityOfModel( dateEntity, 'datetime' ) ?
				dateEntity.id :
				null
		);
		const { getRelatedEntitiesForIds } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const entities = getRelatedEntitiesForIds(
			'datetime',
			dateEntityIds,
			'ticket'
		);
		const loaded = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntitiesForIds',
			[ 'datetime', dateEntityIds, 'ticket' ]
		);
		// console.log( '' );
		// console.log(
		// 	'%c useTicketsForEventDates: ',
		// 	'color: gold;',
		// 	dateEntityIds
		// );
		// console.log( ' > ticketEntities: ', entities );
		// console.log( '%c > loaded: ', 'color: yellowgreen;', loaded );
		return {
			ticketEntities: entities,
			ticketEntitiesLoaded: loaded,
		};
	}, [ dateEntities, dateEntitiesLoaded ] );
};

export default useTicketsForEventDates;
