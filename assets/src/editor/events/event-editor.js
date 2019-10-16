/**
 * External imports
 */
import { render } from '@wordpress/element';

import { EventDatesAndTicketsMetabox } from './';

const container = document.getElementById( 'normal-sortables' );
const editor = document.createElement( 'div' );
editor.className = 'ee-editor-div';
container.prepend( editor );
const eventData = window.eeEditorEventData;
console.log( '%c > eventData: ', 'color: #BCBDAC;', eventData );
const eventId = eventData.event && eventData.event.EVT_ID ?
	eventData.event.EVT_ID :
	0;
console.log( '%c > eventId: ', 'color: #BCBDAC;', eventId );

if ( eventId ) {
	render(
		<EventDatesAndTicketsMetabox eventId={ eventId } />,
		editor
	);
}
