/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useRef, useState } from '@wordpress/element';

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
	const venueLoaded = venue !== EMPTY_OBJECT;

	const initializeEntities = async ( generator ) => {
		for await ( const entities of generator ) {
			if ( entities.hasOwnProperty( 'event' ) &&
				Array.isArray( entities.event )
			) {
				setEvent( entities.event.pop() );
			}
			if ( entities.hasOwnProperty( 'datetime' ) &&
				Array.isArray( entities.datetime ) &&
				! isEmpty( entities.datetime )
			) {
				setEventDates( entities.datetime );
			}
			if ( entities.hasOwnProperty( 'ticket' ) &&
				Array.isArray( entities.ticket ) &&
				! isEmpty( entities.ticket )
			) {
				setTickets( entities.ticket );
			}
			if ( entities.hasOwnProperty( 'venue' ) &&
				Array.isArray( entities.venue ) &&
				! isEmpty( entities.venue )
			) {
				setVenue( entities.venue.pop() );
			}
		}
	};
	if ( ! initialized ) {
		initializeEntities( generator.current ).then( () => {
			console.log(
				'%c~~~ INITIALIZATION COMPLETE ~~~ ',
				'color: Lime; font-size:24px;'
			);
			setInitialized( true );
		} );
	}

	return { initialized, eventLoaded, eventDatesLoaded, ticketsLoaded, venueLoaded };
};

export default useEditorInitialization;
