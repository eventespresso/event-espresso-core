/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useRef, useState } from '@wordpress/element';
import {
	useEventEditorEvent,
	useEventDatesForEvent,
	useEventVenue,
	useTicketsForEventDates,
} from '@eventespresso/hooks';

/**
 * External imports
 */
import hydrateData from './data-hydrator';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const useEditorInitialization = ( eventData ) => {
	const generator = useRef( hydrateData( eventData ) );
	const [ initialized, setInitialized ] = useState( false );
	const [ event, setEvent ] = useState( EMPTY_OBJECT );
	const [ eventDates, setEventDates ] = useState( EMPTY_ARRAY );
	const [ tickets, setTickets ] = useState( EMPTY_ARRAY );
	const [ venue, setVenue ] = useState( EMPTY_OBJECT );
	const eventLoaded = event !== EMPTY_OBJECT;
	const eventDatesLoaded = eventDates !== EMPTY_ARRAY;
	const ticketsLoaded = tickets !== EMPTY_ARRAY;
	const venueLoaded = event !== EMPTY_OBJECT;
	if ( initialized ) {
		let {
			eventEntity: event,
			eventEntityLoaded: eventLoaded,
		} = useEventEditorEvent( eventData.eventId );
		let {
			dateEntities: eventDates,
			dateEntitiesLoaded: eventDatesLoaded,
		} = useEventDatesForEvent( event, eventLoaded );
		let {
			ticketEntities: tickets,
			ticketEntitiesLoaded: ticketsLoaded,
		} = useTicketsForEventDates( eventDates, eventDatesLoaded );
		let {
			venueEntity: venue,
			venueEntityLoaded: venueLoaded,
		} = useEventVenue( event, eventLoaded );
	} else {
		for ( const results of generator.current ) {
			results.then( ( init ) => {
				if ( Array.isArray( init.event ) && ! isEmpty( init.event ) ) {
					setEvent( init.event.pop() );
				}
				if ( Array.isArray( init.datetime ) &&
					! isEmpty( init.datetime ) ) {
					setEventDates( init.datetime );
				}
				if ( Array.isArray( init.ticket ) &&
					! isEmpty( init.ticket ) ) {
					setTickets( init.ticket );
				}
				if ( Array.isArray( init.venue ) && ! isEmpty( init.venue ) ) {
					setVenue( init.venue.pop() );
				}
			} );
		}
		if ( eventLoaded && eventDatesLoaded && ticketsLoaded && venueLoaded ) {
			setInitialized( true );
		}
	}
	return {
		event,
		eventDates,
		tickets,
		venue,
		eventLoaded,
		eventDatesLoaded,
		ticketsLoaded,
		venueLoaded,
	};
};

export default useEditorInitialization;
