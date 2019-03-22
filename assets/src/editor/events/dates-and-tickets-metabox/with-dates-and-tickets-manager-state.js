/**
 * External imports
 */
import { compose, withState } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import {
	withEditorModal,
	withEntityPagination,
	withFormContainerAndPlaceholder,
} from '@eventespresso/higher-order-components';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import {
	sortDatesList,
} from '../dates-and-times/editor-date/filter-bar/dates-list-filter-utils';
import { default as DatesAndTicketsManager } from './dates-and-tickets-manager';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: TICKET } = ticketModel;

/**
 * withDatesAndTicketsManagerState
 * Higher-Order-Component that wraps an "EntityListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} DatesAndTicketsManager
 * @return {Object} WrappedComponent with added EntityListFilterState
 */
export default compose( [
	withState( {
		loading: true,
		initialized: false,
		entities: [],
		tickets: [],
		eventDateTicketMap: {},
		entitiesPerPage: 6,
		position: 'bottom',
		notice: __(
			'loading event date ticket assignments',
			'event_espresso'
		),
	} ),
	withSelect( ( select, ownProps ) => {
		const { editorOpen, initialized } = ownProps;
		const {
			loading,
			date,
			allDates,
			ticket,
			allTickets,
			entities,
			tickets,
			setState,
		} = ownProps;
		let { eventDateTicketMap } = ownProps;
		const resetRelationsMap = () => {
			setState( { initialized: false } );
		};
		let dtmProps = {
			loading,
			entities,
			tickets,
			eventDateTicketMap,
			resetRelationsMap,
		};
		if ( ! editorOpen || initialized ) {
			return dtmProps;
		}
		if ( isModelEntityOfModel( date, DATETIME ) ) {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			const relatedTickets = getRelatedEntities( date, TICKET );
			const relationsResolved = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ date, TICKET ]
			);
			if ( ! relationsResolved || ! Array.isArray( relatedTickets ) ) {
				return dtmProps;
			}
			dtmProps = {
				loading: false,
				initialized: true,
				entities: [ date ],
				tickets: allTickets,
				eventDateTicketMap: { [ date.id ]: relatedTickets },
				resetRelationsMap,
			};
			setState( dtmProps );
		} else if ( isModelEntityOfModel( ticket, TICKET ) ) {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			const relatedDates = getRelatedEntities( ticket, DATETIME );
			const relationsResolved = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ ticket, DATETIME ]
			);
			if ( ! relationsResolved || ! Array.isArray( relatedDates ) ) {
				return dtmProps;
			}
			eventDateTicketMap = {};
			for ( let x = 0; x < relatedDates.length; x++ ) {
				const relatedDate = relatedDates[ x ];
				if ( isModelEntityOfModel( relatedDate, DATETIME ) ) {
					eventDateTicketMap[ relatedDate.id ] = ticket;
				}
			}
			dtmProps = {
				loading: false,
				initialized: true,
				entities: sortDatesList( allDates ),
				tickets: [ ticket ],
				eventDateTicketMap: eventDateTicketMap,
				resetRelationsMap,
			};
			setState( dtmProps );
		} else if ( Array.isArray( allDates ) && Array.isArray( allTickets ) ) {
			const { getRelatedEntities, getRelatedEntitiesForIds } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );

			const dateIds = [];
			allDates.forEach( ( oneDate ) => {
				if ( isModelEntityOfModel( oneDate, DATETIME ) ) {
					dateIds.push( oneDate.id );
				}
			} );
			getRelatedEntitiesForIds(
				DATETIME,
				dateIds,
				TICKET
			);
			const allRelationsResolved = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntitiesForIds',
				[ DATETIME, dateIds, TICKET ]
			);
			if ( ! allRelationsResolved ) {
				return dtmProps;
			}
			let resolvedRelations = 0;
			eventDateTicketMap = {};
			for ( let x = 0; x < allDates.length; x++ ) {
				const oneDate = allDates[ x ];
				if ( isModelEntityOfModel( oneDate, DATETIME ) && oneDate.id ) {
					const relatedTickets = getRelatedEntities(
						oneDate,
						TICKET
					);
					const relationsResolved = hasFinishedResolution(
						'eventespresso/core',
						'getRelatedEntities',
						[ oneDate, TICKET ]
					);
					if ( ! relationsResolved ) {
						return dtmProps;
					}
					if ( Array.isArray( relatedTickets ) ) {
						resolvedRelations++;
						relatedTickets.forEach( ( relatedTicket ) => {
							if ( isModelEntityOfModel( relatedTicket, TICKET ) ) {
								if ( ! eventDateTicketMap[ oneDate.id ] &&
									! Array.isArray( eventDateTicketMap[ oneDate.id ] )
								) {
									eventDateTicketMap[ oneDate.id ] = [];
								}
								eventDateTicketMap[ oneDate.id ].push(
									relatedTicket
								);
							}
						} );
					}
				}
			}
			if ( resolvedRelations < allDates.length ) {
				return dtmProps;
			}
			dtmProps = {
				loading: false,
				initialized: true,
				entities: sortDatesList( allDates ),
				tickets: allTickets,
				eventDateTicketMap: eventDateTicketMap,
				resetRelationsMap,
			};
			setState( dtmProps );
		}
		return dtmProps;
	} ),
	withDispatch( ( dispatch ) => {
		const addTickets = ( date, tickets ) => new Promise(
			( resolve, reject ) => {
				if ( ! isModelEntityOfModel( date, DATETIME ) ) {
					reject(
						'date is not a BaseEntity of the model ' + DATETIME
					);
				}
				const {
					createRelation,
					persistRelationsForEntityIdAndRelation,
				} = dispatch( 'eventespresso/core' );
				if ( Array.isArray( tickets ) ) {
					tickets.forEach( async ( ticket ) => {
						if ( isModelEntityOfModel( ticket, TICKET ) ) {
							createRelation(
								DATETIME,
								date.id,
								TICKET,
								ticket
							);
						}
					} );
				}
				resolve(
					persistRelationsForEntityIdAndRelation(
						DATETIME,
						date.id,
						TICKET
					)
				);
			}
		);
		const removeTickets = ( date, tickets ) => new Promise(
			( resolve, reject ) => {
				if ( ! isModelEntityOfModel( date, DATETIME ) ) {
					reject(
						'date is not a BaseEntity of the model ' + DATETIME
					);
				}
				const {
					removeRelationForEntity,
					persistRelationsForEntityIdAndRelation,
				} = dispatch( 'eventespresso/core' );
				if ( Array.isArray( tickets ) ) {
					tickets.forEach( ( ticket ) => {
						if ( isModelEntityOfModel( ticket, TICKET ) ) {
							removeRelationForEntity(
								DATETIME,
								date.id,
								TICKET,
								ticket.id
							);
						}
					} );
				}
				resolve(
					persistRelationsForEntityIdAndRelation(
						DATETIME,
						date.id,
						TICKET,
						false
					)
				);
			}
		);
		return { addTickets, removeTickets };
	} ),
	withEditorModal( {
		title: __( 'Event Date Ticket Assignments', 'event_espresso' ),
		customClass: 'ee-event-date-tickets-manager-modal',
		closeButtonLabel: __( 'close event date tickets manager',
			'event_espresso'
		),
	} ),
	withFormContainerAndPlaceholder,
	withEntityPagination( {
		returnAsProp: true,
	} ),
] )( DatesAndTicketsManager );
