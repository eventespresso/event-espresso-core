/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { sortDateEntitiesList } from
	'../../dates-and-times/editor-date/filter-bar/date-entities-list-filter-utils';
import { sortTicketEntitiesList } from
	'../../tickets/editor-ticket/filter-bar/tickets-list-entity-filter-utils';

const EMPTY_OBJECT = {};
const INITIAL_COUNTS = { dates: {}, tickets: {} };

const useTicketAssignments = ( {
	dateEntity,
	ticketEntity,
	allDateEntities: dateEntities,
	allTicketEntities: ticketEntities,
} ) => {
	const ticketDateMap = useRef( EMPTY_OBJECT );
	const assignmentCounts = useRef( INITIAL_COUNTS );
	return useSelect( ( select ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		let entities;
		// initial setup based on incoming entity
		if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			entities = [ dateEntity ];
			ticketEntities = sortTicketEntitiesList( ticketEntities );
		} else if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			entities = sortDateEntitiesList( dateEntities );
			ticketEntities = [ ticketEntity ];
		} else {
			entities = sortDateEntitiesList( dateEntities );
			ticketEntities = sortTicketEntitiesList( ticketEntities );
		}
		// setup the assignmentCounts for all the tickets and all the dates!
		entities.forEach( ( date ) => {
			const relatedTickets = getRelatedEntities( date, 'ticket' );
			ticketDateMap.current[ date.id ] = relatedTickets;
			assignmentCounts.current.dates[ date.id ] =
				relatedTickets.length || 0;
		} );
		ticketEntities.forEach( ( ticket ) => {
			const relatedDates = getRelatedEntities(
				ticket,
				'datetime'
			);
			assignmentCounts.current.tickets[ ticket.id ] =
				relatedDates.length || 0;
			// no need to set ticketDateMap here as
			// those will already have been setup for all dates.
		} );
		return {
			entities,
			dateEntities,
			ticketEntities,
			currentAssignmentCounts: assignmentCounts.current,
			ticketDateMap: ticketDateMap.current,
		};
	}, [
		dateEntity,
		dateEntities,
		ticketEntity,
		ticketEntities,
		assignmentCounts,
		ticketDateMap,
	] );
};

useTicketAssignments.propTypes = {
	dateEntity: PropTypes.object,
	ticketEntity: PropTypes.object,
	allDateEntities: PropTypes.arrayOf( PropTypes.object ),
	allTicketEntities: PropTypes.arrayOf( PropTypes.object ),
};

export default useTicketAssignments;
