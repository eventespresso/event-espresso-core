/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { dispatch, select } from '@wordpress/data';
import { dateTimeModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: DATETIME } = dateTimeModel;
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
 * @param {Object} ticketEntity  EE Ticket object
 * @param {Array} relatedDates    Event Dates for the Ticket
 * @param {boolean} datesLoaded
 * @return {boolean}  true if copy was successful
 */
export const copyTicket = async (
	ticketEntity,
	relatedDates,
	datesLoaded
) => {
	if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
		return false;
	}
	createEntity(
		TICKET,
		ticketEntity.forClone
	).then(
		async ( newTicketEntity ) => {
			if ( datesLoaded ) {
				createRelations(
					TICKET,
					newTicketEntity.id,
					DATETIME,
					relatedDates
				);
			}
			return Promise.resolve( newTicketEntity );
		}
	).then(
		async ( newTicketEntity ) => {
			return await persistEntityRecord(
				TICKET,
				newTicketEntity
			);
		}
	).then(
		async ( newTicketEntity ) => {
			const newTicket = newTicketEntity;
			persistRelationsForEntityId(
				TICKET,
				newTicketEntity.id
			).then(
				async () => {
					new Promise(
						( resolve ) => {
							if ( isModelEntityOfModel( newTicket, TICKET ) ) {
								const newDates = getRelatedEntities(
									newTicket,
									DATETIME
								);
								if ( ! isEmpty( newDates ) ) {
									resolve( newDates );
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
