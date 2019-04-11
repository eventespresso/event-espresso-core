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
	if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
		return false;
	}
	createEntity(
		'ticket',
		ticketEntity.forClone
	).then(
		async ( newTicketEntity ) => {
			if ( datesLoaded ) {
				createRelations(
					'ticket',
					newTicketEntity.id,
					'datetime',
					relatedDates
				);
			}
			return Promise.resolve( newTicketEntity );
		}
	).then(
		async ( newTicketEntity ) => {
			return await persistEntityRecord(
				'ticket',
				newTicketEntity
			);
		}
	).then(
		async ( newTicketEntity ) => {
			const newTicket = newTicketEntity;
			persistRelationsForEntityId(
				'ticket',
				newTicketEntity.id
			).then(
				async () => {
					new Promise(
						( resolve ) => {
							if ( isModelEntityOfModel( newTicket, 'ticket' ) ) {
								const newDates = getRelatedEntities(
									newTicket,
									'datetimes'
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
