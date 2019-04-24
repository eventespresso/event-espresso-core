/**
 * External imports
 */
import { uniq } from 'lodash';
import warning from 'warning';
import { compose, withState } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import {
	withEditorModal,
	withEntityPagination,
	withFormContainerAndPlaceholder,
} from '@eventespresso/higher-order-components';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import {
	sortDatesList,
} from '../dates-and-times/editor-date/filter-bar/dates-list-filter-utils';
import { default as TicketAssignmentsManager } from './ticket-assignments-manager';

/**
 * withDatesAndTicketsManagerState
 * Higher-Order-Component that wraps an "EntityListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} TicketAssignmentsManager
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
		const {
			editorOpen,
			initialized,
			date,
			allDates,
			ticket,
			allTickets,
			entities,
			tickets,
			setState,
		} = ownProps;
		let { loading } = ownProps;
		const resetRelationsMap = () => {
			setState( { initialized: false } );
		};
		let dtmProps = {
			loading,
			entities,
			tickets,
			resetRelationsMap,
		};
		if ( ! editorOpen || initialized ) {
			return dtmProps;
		}
		if ( isModelEntityOfModel( date, 'datetime' ) ) {
			dtmProps = {
				initialized: true,
				entities: [ date ],
				tickets: allTickets,
			};
		} else if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
			dtmProps = {
				initialized: true,
				entities: sortDatesList( allDates ),
				tickets: [ ticket ],
			};
		} else if ( Array.isArray( allDates ) && Array.isArray( allTickets ) ) {
			dtmProps = {
				initialized: true,
				entities: sortDatesList( allDates ),
				tickets: allTickets,
			};
		}
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const eventDateTicketMap = {};
		dtmProps.entities.forEach( ( dateEntity ) => {
			if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
				const relatedTickets = getRelatedEntities( dateEntity, 'tickets' );
				const ticketRelationsResolved = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntities',
					[ dateEntity, 'tickets' ]
				);
				if ( ticketRelationsResolved ) {
					loading = false;
					eventDateTicketMap[ dateEntity.id ] = uniq( relatedTickets );
				}
			}
		} );
		setState( {
			...dtmProps,
			eventDateTicketMap,
			resetRelationsMap,
			loading: loading,
		} );
		return dtmProps;
	} ),
	withDispatch( ( dispatch ) => {
		const addTickets = ( date, tickets ) => {
			warning(
				isModelEntityOfModel( date, 'datetime' ),
				'date is not a BaseEntity of the datetime model.'
			);
			const { createRelation } = dispatch( 'eventespresso/core' );
			const relationsAdded = [];
			if ( Array.isArray( tickets ) ) {
				for ( const ticket of tickets ) {
					warning(
						isModelEntityOfModel( ticket, 'ticket' ),
						'ticket is not a BaseEntity of the ticket model.'
					);
					relationsAdded.push(
						createRelation(
							'datetime',
							date.id,
							'tickets',
							ticket
						)
					);
				}
			}
			return Promise.all( relationsAdded );
		};
		const removeTickets = ( date, tickets ) => {
			warning(
				isModelEntityOfModel( date, 'datetime' ),
				'date is not a BaseEntity of the datetime model.'
			);
			const {
				removeRelationForEntity,
			} = dispatch( 'eventespresso/core' );
			const relationsRemoved = [];
			if ( Array.isArray( tickets ) ) {
				tickets.forEach( ( ticket ) => {
					warning(
						isModelEntityOfModel( ticket, 'ticket' ),
						'ticket is not a BaseEntity of the ticket model.'
					);
					relationsRemoved.push(
						removeRelationForEntity(
							'datetime',
							date.id,
							'tickets',
							ticket.id
						)
					);
				} );
			}
			return Promise.all( relationsRemoved );
		};
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
] )( TicketAssignmentsManager );
