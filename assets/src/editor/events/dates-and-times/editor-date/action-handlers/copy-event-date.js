/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { dispatch, select } from '@wordpress/data';
import { dateTimeModel, eventModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: EVENT } = eventModel;
const { MODEL_NAME: TICKET } = ticketModel;

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
	if ( ! isModelEntityOfModel( datetimeEntity, DATETIME ) ) {
		return false;
	}
	createEntity(
		DATETIME,
		datetimeEntity.forClone
	).then(
		async ( newDatetimeEntity ) => {
			if ( ! isEmpty( relatedTickets ) ) {
				createRelations(
					DATETIME,
					newDatetimeEntity.id,
					TICKET,
					relatedTickets
				);
			}
			createRelations(
				EVENT,
				datetimeEntity.EVT_ID,
				DATETIME,
				[ newDatetimeEntity ]
			);
			return Promise.resolve( newDatetimeEntity );
		}
	).then(
		async ( newDatetimeEntity ) => {
			return await persistEntityRecord(
				DATETIME,
				newDatetimeEntity
			);
		}
	).then(
		async ( newDatetimeEntity ) => {
			const newDatetime = newDatetimeEntity;
			persistRelationsForEntityId(
				DATETIME,
				newDatetimeEntity.id
			).then(
				async () => {
					new Promise(
						( resolve ) => {
							if ( isModelEntityOfModel( newDatetime, DATETIME ) ) {
								const newTickets = getRelatedEntities(
									newDatetime,
									TICKET
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
