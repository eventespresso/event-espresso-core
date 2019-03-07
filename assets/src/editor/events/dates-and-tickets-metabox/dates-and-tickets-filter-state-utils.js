/**
 * External dependencies
 */
import { isEmpty, isUndefined, uniq } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {mixed} element
 * @return {boolean} true if value is undefined
 */
const removeUndefined = ( element ) => ! isUndefined( element );

/**
 * @function
 * @param {Array} a
 * @return {Array} new array with undefined and duplicate elements removed
 */
export const condenseArray = ( a ) => uniq( a.filter( removeUndefined ) );

/**
 * @function
 * @param {Array} datetimeEntities
 * @return {Array} array of IDs for supplied datetime entities
 */
export const getDatetimeEntityIds = ( datetimeEntities ) => {
	const datetimeEntityIds = [];
	if ( Array.isArray( datetimeEntities ) && ! isEmpty( datetimeEntities ) ) {
		for ( let i = 0; i < datetimeEntities.length; i++ ) {
			const datetimeEntity = datetimeEntities[ i ];
			if (
				datetimeEntity &&
				isModelEntityOfModel( datetimeEntity, 'datetime' ) &&
				datetimeEntity.id
			) {
				datetimeEntityIds.push( datetimeEntity.id );
			}
		}
	}
	return condenseArray( datetimeEntityIds );
};

/**
 * generates a multidimensional array
 * where the first level keys are datetime IDs
 * and the values are arrays of each date's related ticket entities
 *
 * @function
 * @param {Array} eventDateIds
 * @param {Array} ticketEntities
 * @param {Array} datetimeTicketEntities
 * @return {Array} Event Date Ticket Relations Map
 */
export const buildEventDateTicketRelationsMap = (
	eventDateIds,
	ticketEntities,
	datetimeTicketEntities
) => {
	const relationsMap = {};
	if (
		Array.isArray( eventDateIds ) &&
		! isEmpty( eventDateIds ) &&
		Array.isArray( ticketEntities ) &&
		! isEmpty( ticketEntities ) &&
		Array.isArray( datetimeTicketEntities ) &&
		! isEmpty( datetimeTicketEntities )
	) {
		for ( let j = 0; j < datetimeTicketEntities.length; j++ ) {
			const relation = datetimeTicketEntities[ j ];
			if (
				relation &&
				isModelEntityOfModel(
					relation,
					'datetime_ticket'
				) &&
				relation.DTT_ID &&
				relation.TKT_ID
			) {
				if ( isEmpty( relationsMap[ relation.DTT_ID ] ) ) {
					relationsMap[ relation.DTT_ID ] = [];
				}
				relationsMap[ relation.DTT_ID ].push(
					relation.TKT_ID
				);
			}
		}
		if ( ! isEmpty( relationsMap ) ) {
			for ( let x = 0; x < eventDateIds.length; x++ ) {
				const eventDateId = eventDateIds[ x ];
				const ticketIds = relationsMap[ eventDateId ];
				if ( ! isEmpty( ticketIds ) ) {
					for ( let y = 0; y < ticketIds.length; y++ ) {
						const ticketId = ticketIds[ y ];
						if ( ticketId ) {
							for ( let z = 0; z < ticketEntities.length; z++ ) {
								const ticketEntity = ticketEntities[ z ];
								if (
									isModelEntityOfModel(
										ticketEntity,
										'ticket'
									) &&
									ticketId === ticketEntity.id
								) {
									relationsMap[ eventDateId ][ y ] =
										ticketEntity;
								}
							}
						}
					}
				}
			}
		}
	}
	return relationsMap;
};
