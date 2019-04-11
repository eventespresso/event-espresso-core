/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { dispatch, select } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { getRelatedEntities } = select( 'eventespresso/core' );
const {
	createEntity,
	createRelations,
	persistEntityRecord,
	persistRelationsForEntityId,
} = dispatch( 'eventespresso/core' );

/**
 * @function
 * @param {Object} datetimeEntity  EE Date object
 * @param {Array} relatedTickets    Tickets for Event Date
 * @param {boolean} ticketsLoaded
 * @return {boolean}  true if copy was successful
 */
export const copyEventDate = async (
	datetimeEntity,
	relatedTickets,
	ticketsLoaded,
) => {
	if ( ! isModelEntityOfModel( datetimeEntity, 'datetime' ) ) {
		return false;
	}
	createEntity(
		'datetime',
		datetimeEntity.forClone
	).then(
		async ( newDatetimeEntity ) => {
			if ( ticketsLoaded && ! isEmpty( relatedTickets ) ) {
				createRelations(
					'datetime',
					newDatetimeEntity.id,
					'tickets',
					relatedTickets
				);
			}
			createRelations(
				'event',
				datetimeEntity.EVT_ID,
				'datetimes',
				[ newDatetimeEntity ]
			);
			return Promise.resolve( newDatetimeEntity );
		}
	).then(
		async ( newDatetimeEntity ) => {
			return await persistEntityRecord(
				'datetime',
				newDatetimeEntity
			);
		}
	).then(
		async ( newDatetimeEntity ) => {
			const newDatetime = newDatetimeEntity;
			persistRelationsForEntityId(
				'datetime',
				newDatetimeEntity.id
			).then(
				async () => {
					new Promise(
						( resolve ) => {
							if ( isModelEntityOfModel( newDatetime, 'datetime' ) ) {
								const newTickets = getRelatedEntities(
									newDatetime,
									'tickets'
								);
								if ( ! isEmpty( newTickets ) ) {
									resolve( newTickets );
								}
							}
						}
					).then(
						() => {
							return true;
						}
					);
				}
			);
		}
	);
};
